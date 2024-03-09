import 'reflect-metadata'
import { Container } from 'inversify'
import { ClienteController } from '../../Adapter/Controllers'
import {
  ListarClientesCoordenadasUseCase,
  CadastrarClienteUseCase,
} from '../../Application/UseCases/Cliente'
import { ClienteRepository } from '../Repositories'
import { TYPES } from './Types'
import { PostgresPool } from './postgre.config'
import { RotaOtimizadaUseCase } from '../../Application/UseCases/Rota'
import { GetAllClientesUseCase } from '../../Application/UseCases/Cliente/ListarClientesUseCase'

const container = new Container()

// Bind Cliente
container.bind(TYPES.ClienteController).to(ClienteController)
container.bind(TYPES.ClienteRepository).to(ClienteRepository)
container.bind(TYPES.CadastrarClienteUseCase).to(CadastrarClienteUseCase)
container.bind<PostgresPool>(TYPES.PostgresPool).to(PostgresPool)
container
  .bind<ListarClientesCoordenadasUseCase>(
    TYPES.ListarClientesCoordenadasUseCase,
  )
  .to(ListarClientesCoordenadasUseCase)
container
  .bind<GetAllClientesUseCase>(TYPES.GetAllClientesUseCase)
  .to(GetAllClientesUseCase)
container.bind(TYPES.RotaOtimizadaUseCase).to(RotaOtimizadaUseCase)

export { container }
