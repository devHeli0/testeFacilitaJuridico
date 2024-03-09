import { ICadastrarCoordenadaDTO, ICoordenadaDTO } from './CoordenadaDTO'

export interface ICadastrarClienteDTO {
  id: number
  nome: string
  email: string
  telefone: string
  coordenada: ICadastrarCoordenadaDTO
}

export interface IGetClienteDTO {
  id: number
  nome: string
  email: string
  telefone: string
  coordenada: ICoordenadaDTO
}

export interface IGetAllClientDTO {
  clientes: IGetClienteDTO[];
}

export interface IListarClientesDTO {
  nome?: string
  email?: string
  telefone?: string
}
