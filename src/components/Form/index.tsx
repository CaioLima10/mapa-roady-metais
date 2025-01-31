import React, { FormEvent, useState } from "react"
import { FaSearch } from "react-icons/fa";
import "./styles.css"
import { Coordenadas } from "../../utils/types/coordenadas";
import { Root } from "../../utils/types/lojas";
import { ModalContentStore } from "./modal-content-store";


interface Props {
  erro: string
  lojasProximas: Root[]
  handleSubmit: (e: React.FormEvent) => void
  cep: string
  setCep: (value: string) => void
  calcularDistancia: (lat1: number, lon1: number, lat2: number, lon2: number) => number
  coordenadas: Coordenadas
  showForm: boolean    
} 

export function Form({ 
    erro, 
    lojasProximas, 
    handleSubmit, 
    cep, 
    setCep, 
    calcularDistancia, 
    coordenadas,
    showForm,
  }: Props) {

    const [ isModalContent, setIsModalContent ] = useState(false)
    const [selectedLoja, setSelectedLoja] = useState<Root | null>(null);

    const handleLojaClick = (loja: Root, e?: FormEvent) => {
      e?.stopPropagation()
      setSelectedLoja(loja); 
      setIsModalContent(true); 
    };


  return (
    <>
        { showForm && (
      <div  className="container-form" onClick={(e) => e.stopPropagation()}>
          <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className="form">
            <h1 className="title">
              Encontre lojas Roady próximas a você
            </h1>
            <div className="container-search">
              <input
                type="text"
                placeholder="Digite seu CEP"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                className="input"
              />
              <button type="submit" className="button">
                <FaSearch />
              </button>
            </div>
            <p className="results-lojas">
                Loja encontradas na sua região: 
                <span className="results" style={{ background: lojasProximas.length === 0 ? "transparent" : "#fff" }}>
                {lojasProximas.length === 0 ? "" : lojasProximas.length}
              </span>
            </p>
                {erro && <p className="error">{erro}</p>}
            <div className="container-content">



            {lojasProximas
              .map((loja) => {
                const distancia = calcularDistancia(
                  coordenadas.lat,
                  coordenadas.lng,
                  loja.attributes.endereco.latitude,
                  loja.attributes.endereco.longitude
                );
                return { ...loja, distancia };
              })
              .sort((a, b) => a.distancia - b.distancia)
              .map((loja) => (
                <div key={loja.attributes.endereco.id}>
                  {selectedLoja && isModalContent && loja.attributes.gestao_pro_id === selectedLoja.attributes.gestao_pro_id && (
                    <ModalContentStore
                      isModalContent={isModalContent}
                      setIsModalContent={setIsModalContent}
                      loja={loja} 
                    />
                  )}
                  <div onClick={() => handleLojaClick(loja)} className="box-content" key={loja.attributes.endereco.id}>
                    <div className="content">
                      <img className="lojas-clientes" src={loja.attributes.image} alt="" />
                      <div className="content-text">
                        <span className="text-info-loja">{loja.attributes.nome_fantasia}</span>
                        <p>
                          Distância: {loja.distancia.toFixed(2)} km
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </form>
          </div>
          ) }
    </>
  )
}