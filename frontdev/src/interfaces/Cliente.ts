import type Coordenada from './Coordenada'

export default interface Cliente {
  id?: number
  nome: string
  email: string
  telefone: string
  coordenada: Coordenada
}
