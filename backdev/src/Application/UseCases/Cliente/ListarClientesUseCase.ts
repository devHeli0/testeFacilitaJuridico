import { inject, injectable } from 'inversify'
import { Cliente } from '../../../Domain/Entities'
import { IClienteRepository } from '../../../Domain/Repositories'
import { TYPES } from '../../../Infrastructure/Config/Types'
import Coordenada from '../../../Domain/Entities/Coordenada'

@injectable()
export class ListarClientesCoordenadasUseCase {
  constructor(
    @inject(TYPES.ClienteRepository)
    private clienteRepository: IClienteRepository,
  ) {}

  async execute(): Promise<Coordenada[]> {
    return this.clienteRepository.listarClientesCoordenadas()
  }
}

@injectable()
export class GetAllClientesUseCase {
  constructor(
    @inject(TYPES.ClienteRepository)
    private clienteRepository: IClienteRepository,
  ) {}

  async execute(): Promise<Cliente[]> {
    return this.clienteRepository.getAllClientes()
  }
}
