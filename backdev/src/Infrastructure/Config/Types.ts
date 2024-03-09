const TYPES = {
  ClienteController: Symbol.for('ClienteController'),
  ClienteRepository: Symbol.for('ClienteRepository'),
  GetClienteUseCase: Symbol.for('GetClienteUseCase'),
  CadastrarClienteUseCase: Symbol.for('CadastrarClienteUseCase'),
  ListarClientesCoordenadasUseCase: Symbol.for(
    'ListarClientesCoordenadasUseCase',
  ),
  GetAllClientesUseCase: Symbol.for('GetAllClientesUseCase'),
  PostgresPool: Symbol.for('PostgresPool'),
  RotaOtimizadaUseCase: Symbol.for('RotaOtimizadaUseCase'),
}

export { TYPES }
