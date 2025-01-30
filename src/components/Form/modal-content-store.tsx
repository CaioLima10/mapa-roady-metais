import React from "react"
import { FaWhatsapp } from "react-icons/fa"
import { FaX } from "react-icons/fa6"
import "../Modal/styles.css"
import { Attributes } from "../../utils/types/lojas"

interface Props {
  isModalContent: boolean
  setIsModalContent: (value: boolean) => void
  loja: {
    distancia: number;
    attributes: Attributes;
  };
}

export function ModalContentStore({ isModalContent, setIsModalContent, loja }: Props) {
  
  return(
    <>
        { isModalContent && (
            <div className="modal-overlay" >
              <div className="modal" >
                <div onClick={(e) => e.stopPropagation()}>
                    <h1 className="title-modal">
                      {loja.attributes.nome_fantasia}
                    </h1>
                  <div className="container-button">
                    <button className="button-close" onClick={() => setIsModalContent(false)}>
                      <FaX/>
                    </button>
                      <a className="button-whats" href={loja.attributes.whatsapp} target="_blank" rel="noreferrer">
                        <FaWhatsapp size={22} color="#fff"/>
                      </a>
                  </div>
                  <span className="text">Ou</span><br/>
                  <p className="text-phone">Ligue aqui <br/>Telefone: {loja.attributes.telefone }</p>
                </div>
              </div>
            </div>
        ) }
    </>
  )
}