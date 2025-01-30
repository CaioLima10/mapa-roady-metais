export interface Root {
  attributes: Attributes
}

export interface Attributes {
  contato: string
  cpfcnpj: string
  createdAt: string
  email: string
  endereco: Endereco
  gestao_pro_id: string
  ierg: string
  image: string
  inicio_almoco: string
  media: number
  nome_fantasia: string
  rank: string
  razao_social: string
  status: string
  telefone: string
  termino_almoco: string
  ultima_compra: string
  updatedAt: string
  whatsapp: string
}

export interface Endereco {
  bairro: string
  cep: string
  cidade: string
  complemento: string
  estado: string
  id: number
  latitude: number
  longitude: number
  numero: string
  rua: string
}
