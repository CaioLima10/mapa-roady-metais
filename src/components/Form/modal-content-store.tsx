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
                      LOJA:{" "} 
                      {loja.attributes.nome_fantasia}
                    </h1>
                  <div className="container-button">
                    <button className="button-close" onClick={() => setIsModalContent(false)}>
                      <FaX/>
                    </button>
                    <div style={{ display: "flex", flexDirection: "column", margin: "auto" }}>
                      <div>
                        <span className="address-client">{`${loja.attributes.endereco.bairro}, ${loja.attributes.endereco.numero},
                          ${loja.attributes.endereco.cidade} - ${loja.attributes.endereco.cep}`}
                        </span>
                      </div><br />
                          <span>Entre em contato:</span><br />
                      <div className="box-midia"> 
                        <p className="text-whats">Conversar no Whatsapp:</p>
                          <a className="button-whats" 
                              href={`https://wa.me/${loja.attributes.whatsapp}/?text=${encodeURIComponent("Oi! eu vim pelo site da Roady Metais")}`} 
                              target="_blank" rel="noreferrer">
                              <FaWhatsapp size={22} color="#fff"/>
                          </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        ) }
    </>
  )
}