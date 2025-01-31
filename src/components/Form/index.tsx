import React, { FormEvent, useEffect, useState } from "react"
import { FaArrowUp, FaSearch } from "react-icons/fa";
import "./styles.css"
import { Coordenadas } from "../../utils/types/coordenadas";
import { Root } from "../../utils/types/lojas";
import { ModalContentStore } from "./modal-content-store";
import { SiGooglemaps } from "react-icons/si";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";




interface Props {
  erro: string
  lojasProximas: Root[]
  handleSubmit: (e: React.FormEvent) => void
  cep: string
  setCep: (value: string) => void
  calcularDistancia: (lat1: number, lon1: number, lat2: number, lon2: number) => number
  coordenadas: Coordenadas

} 

export function Form({ 
    erro, 
    lojasProximas, 
    handleSubmit, 
    cep, 
    setCep, 
    calcularDistancia, 
    coordenadas,
  }: Props) {

    const [ isModalContent, setIsModalContent ] = useState(false)
    const [selectedLoja, setSelectedLoja] = useState<Root | null>(null);
    const [showForm, setShowForm] = useState<boolean>(true);
    

    const handleLojaClick = (loja: Root) => {
      setSelectedLoja(loja); 
      setIsModalContent(true); 
    };

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth <= 1080) {
          setShowForm(false);
        } else {
          setShowForm(true);
        }
      };
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
      const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
        if (isModalContent) {
          setIsModalContent(false);
        }
      };
    
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
    
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
        document.removeEventListener("touchstart", handleOutsideClick);
      };
    }, [isModalContent]);
    

  return (
    <>
    { showForm ? (
        <div  className="container-form" 
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSubmit}  className="form">
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
                  onTouchStart={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                />
                <button onClick={(e) => e.stopPropagation()} type="submit" className="button">
                  <FaSearch />
                </button>
              </div>
              <p className="results-lojas">
                  Loja encontradas na sua região: 
                  <span className="results" style={{ color: lojasProximas.length === 0 ? "transparent" : "#fff" }}>
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
                          <span className="text-info-nomeFantasia">{loja.attributes.nome_fantasia}</span>
                          <div className="box-content-text">
                            <span className="text-info-rua">{loja.attributes.endereco.rua}</span>
                            <span className="text-info-cep">{loja.attributes.endereco.cep}</span>
                          </div>
                          <div className="box-distancia">
                              <span><SiGooglemaps color="#05a0ee"/></span>
                            <p>
                              Distância: {loja.distancia.toFixed(2)} km
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </form>
            </div>
    ): ""}
     <div className="arrow-show-form"  onClick={() => setShowForm(!showForm)} >
          {showForm ? 
            <div className="arrow-show">
              <span>Ver só MAPA</span>
              <SlArrowDown color="#fff" size={20}/>
            </div>
              :
            <div className="arrow-show">
              <span>Pesquisar CEP</span>
              <span><SlArrowUp color="#fff" size={20}/></span>
            </div>
            }
      </div>

    </>
  )
}