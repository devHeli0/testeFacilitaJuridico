import { inject, injectable } from 'inversify'
import { Cliente } from '../../../Domain/Entities'
import { ICadastrarClienteDTO } from '../../DTOs'
import { IClienteRepository } from '../../../Domain/Repositories'
import { TYPES } from '../../../Infrastructure/Config/Types'

@injectable()
export class CadastrarClienteUseCase {
  constructor(
    @inject(TYPES.ClienteRepository)
    private clienteRepository: IClienteRepository,
  ) {}

  async execute(clienteDTO: ICadastrarClienteDTO): Promise<Cliente> {
    const cadastradoCliente = await this.clienteRepository.cadastrar(clienteDTO)

    return cadastradoCliente
  }
}
