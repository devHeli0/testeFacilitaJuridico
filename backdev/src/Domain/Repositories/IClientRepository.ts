import { Cliente } from '../Entities'
import Coordenada from '../Entities/Coordenada'

interface IClienteRepository {
  cadastrar(cliente: Cliente): Promise<Cliente>
  listarClientesCoordenadas(): Promise<Coordenada[]>
  getAllClientes(): Promise<Cliente[]>
}

export default IClienteRepository
