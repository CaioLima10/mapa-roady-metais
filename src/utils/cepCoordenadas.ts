

import { Coordenadas } from "./types/coordenadas";

export const cepParaCoordenadas = async (cep: string): Promise<Coordenadas> => {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const data = await response.json();

  if (data.erro) {
    throw new Error("CEP inválido");
  }

  const { logradouro, localidade, uf } = data;

  const geoResponse = await fetch(
    `https://nominatim.openstreetmap.org/search?street=${logradouro}&city=${localidade}&state=${uf}&format=json`
  );
  
  const geoData = await geoResponse.json();
  if (geoData.length === 0) {
    throw new Error("Não foi possível encontrar coordenadas para este CEP");
  }
  return {
    lat: parseFloat(geoData[0].lat),
    lng: parseFloat(geoData[0].lon),
  };
};