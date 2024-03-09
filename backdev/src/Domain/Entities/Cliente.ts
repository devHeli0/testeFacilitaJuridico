import { ICadastrarClienteDTO } from '../../Application/DTOs/ClienteDTO'
import { IClienteRepository } from '../Repositories'
import Coordenada from './Coordenada'

class Cliente {
  public readonly id?: number

  public nome: string
  public email: string
  public telefone: string
  public coordenada: Coordenada

  constructor(
    nome: string,
    email: string,
    telefone: string,
    coordenada: Coordenada,
    id?: number,
  ) {
    this.nome = nome
    this.email = email
    this.telefone = telefone
    this.coordenada = coordenada
    this.id = id
  }

  static cadastrar({
    id,
    nome,
    email,
    telefone,
    coordenada,
  }: ICadastrarClienteDTO) {
    const coordenadaCliente = Coordenada.create({
      x: coordenada.x,
      y: coordenada.y,
    })

    return new Cliente(nome, email, telefone, coordenadaCliente, id)
  }

  static async listarClientesCoordenadas(
    repository: IClienteRepository,
  ): Promise<Coordenada[]> {
    return repository.listarClientesCoordenadas()
  }
}

export default Cliente
