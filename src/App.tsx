import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
import "leaflet/dist/leaflet.css";
import './styles.css'; 
import { Form } from "./components/Form/index";
import { Modal } from "./components/Modal/index";
import { Map } from "./components/Map/index";
import { calcularDistancia } from "./utils/calculateDistance";
import { cepParaCoordenadas } from "./utils/cepCoordenadas";
import { Coordenadas } from "./utils/types/coordenadas";
import { Root } from "./utils/types/lojas";

export default function App() {
  const [cep, setCep] = useState<string>("");
  const [coordenadas, setCoordenadas] = useState<Coordenadas>({
    lat: -22.1002,
    lng: -47.0616,
  });
  const [erro, setErro] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(true);
  const [lojasApi, setLojasApi] = useState<Root[]>([]);

  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    const getStores = async () => {
      if (!coordenadas) return;
      try {
        const response = await axios.get("https://front-end-roady.vercel.app/api/v2/lista_publica_clientes", {
          params: {
            latitude: coordenadas.lat,
            longitude: coordenadas.lng,
          },
          timeout: 1000
        });
        setLojasApi(response.data);
        
    
        } catch (error) {
          console.error("Erro ao buscar lojas:", error);
        }
      };
      getStores();
    
  }, [coordenadas, showModal]); 

  
  const lojasProximas = Array.isArray(lojasApi) ? lojasApi.filter(
    (loja) =>
      calcularDistancia(
        coordenadas.lat,
        coordenadas.lng,
        loja.attributes.endereco.latitude,
        loja.attributes.endereco.longitude
      ) <= 5
  ) : [];
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      if(!calcularDistancia) {
        setShowModal(true)
      }
    try {
      const coords = await cepParaCoordenadas(cep);
      setCoordenadas(coords);
      setErro("");
      setCep("");
    } catch (err) {
      setErro("Não foi possível encontrar CEP");
      console.log(err);
    }
  };

  useEffect(() => {
    if (mapRef.current && coordenadas) {
      mapRef.current.setView([coordenadas.lat, coordenadas.lng], 13);
    }
  }, [coordenadas]);

  return (
    <div className="container">
      <Form  
        handleSubmit={handleSubmit}
        cep={cep}
        setCep={setCep}
        erro={erro}
        lojasProximas={lojasProximas}
        calcularDistancia={calcularDistancia}
        coordenadas={coordenadas}

      />
      <Map 
        coordenadas={coordenadas}
        lojasProximas={lojasProximas}
        mapRef={mapRef}
      />
      <Modal 
        showModal={showModal} 
        setShowModal={setShowModal}
      />
    </div>
  );
}
