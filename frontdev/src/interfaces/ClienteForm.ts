export default interface ClienteFormData {
  nome: string
  email: string
  telefone: string
  coordenada: {
    x: number
    y: number
  }
}
