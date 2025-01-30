import L from "leaflet"
import Client from "../assets/icon-home.png"
import Loja from "../assets/icone-loja.png"
import "../styles.css"

export const lojaIcon = new L.Icon({
  className: "lojaIcon",
  iconUrl: Loja,
  iconSize: [60, 60], 
  iconAnchor: [28, 56], 
  popupAnchor: [0, -32] 
});

export const ClientIcon = new L.Icon({
  className: "clientIcon",
  iconUrl: Client,
  iconSize: [70, 70], 
  iconAnchor: [36, 62], 
  popupAnchor: [0, -32] 
});