import "./styles.css"
import { FaWhatsapp } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

interface Props {
  showModal: boolean
  setShowModal: (value: boolean) => void
}

export function Modal({ setShowModal, showModal }: Props) {
    
  return(
    <>
      {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={() => setShowModal(false)}>
              <div onClick={(e) => e.stopPropagation()}>
                  <h1 className="title-modal">
                    Nenhuma loja próxima. Entre em contato conosco!
                  </h1>
                <div className="container-button">
                  <button className="button-close" onClick={() => setShowModal(false)}>
                    <FaX/>
                  </button>
                    <a className="button-whats" href={`https://wa.me/551125147914/text=?${encodeURIComponent("Oi! eu vim pelo site da Roady Metais")} target="_blank" rel="noreferrer"`}>
                      <FaWhatsapp size={22} color="#fff"/>
                    </a>
                </div>
                <span className="text">Ou</span><br/>
                <p className="text-phone">Ligue aqui <br/>Telefone: {'( 11 ) 2514-7914'}</p>
              </div>
            </div>
          </div>
        )}
    </>
  )
}