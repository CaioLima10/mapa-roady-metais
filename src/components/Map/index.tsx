import React from 'react';

import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline } from "react-leaflet";
import { ClientIcon, lojaIcon } from "../../utils/marketIcons";
import "./styles.css"
import { Coordenadas } from "../../utils/types/coordenadas";
import { FaSearch } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { ForwardedRef } from "react";
import {  Root } from "../../utils/types/lojas";

interface Props {
  coordenadas: Coordenadas
  lojasProximas: Root[]

  setShowForm: (value: boolean) => void
  showForm: boolean
  mapRef: ForwardedRef<L.Map | null>
}


export function Map({ coordenadas, lojasProximas, setShowForm, showForm, mapRef }: Props) {

  const getPolylinePositions = () => {
    if (!coordenadas) return [];
    return lojasProximas.map((loja) => [
      [coordenadas.lat, coordenadas.lng] as [number, number],
      [loja.attributes.endereco.latitude, loja.attributes.endereco.longitude] as [number, number],
    ]);

  };

  return (
    <MapContainer
      center={[
        coordenadas ? coordenadas.lat : -23.53451700,  
        coordenadas ? coordenadas.lng : -46.36662600
        ]}
      zoom={13}
      className="map"
      ref={mapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      {coordenadas && (
        <Marker icon={ClientIcon} position={[coordenadas.lat, coordenadas.lng]}>
          <Popup>🏡 Você está aqui!</Popup>
        </Marker>
      )}
      {lojasProximas.map((loja) => (
        <Marker icon={lojaIcon} key={loja.attributes.gestao_pro_id}         
          position={[loja.attributes.endereco.latitude, loja.attributes.endereco.longitude]}>
          <Popup>
            <p>
              Nome da loja: {loja.attributes.nome_fantasia}
            </p>
              <img className="img-lojas" src={loja.attributes.image} alt=""/>
          </Popup>
        </Marker>
      ))}
      {coordenadas && (
        <>
          <Circle 
              center={[coordenadas.lat, coordenadas.lng]}
              radius={lojasProximas.length === 0 ? 0 : 5000}
              pathOptions={{ color: "#3ab5f3" }}
            >
            </Circle>

          {getPolylinePositions().map((positions, index) => (
            <Polyline key={index} positions={positions} pathOptions={{ color: "#3ab5f3" }} />
          ))}
        </>
      )}
        {
          showForm ? (
            <button 
              onClick={() => setShowForm(false)} 
              className="button-search">
                <FaX size={28}/>
            </button>
          ) : (
            <button 
              onClick={() => setShowForm(true)} 
              className="button-search">
                <FaSearch size={28}/>
            </button>
          )
        }
    </MapContainer>
  )
}