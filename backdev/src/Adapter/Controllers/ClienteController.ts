import { injectable, inject } from 'inversify'
import { NextFunction, Request, Response } from 'express'
import {
  CadastrarClienteUseCase,
  ListarClientesCoordenadasUseCase,
  GetAllClientesUseCase,
} from '../../Application/UseCases/Cliente'
import { RotaOtimizadaUseCase } from '../../Application/UseCases/Rota'
import { ClassErrorMiddleware, Controller, Get, Post } from '@overnightjs/core'
import { errorHandlerMiddleware } from '../../middlewares'
import { TYPES } from '../../Infrastructure/Config/Types'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { ICadastrarClienteDTO, IGetClienteDTO } from '../../Application/DTOs'
import { CalculoRota } from '../../Application/BusinessObjects'

import Coordenada from '../../Domain/Entities/Coordenada'

@injectable()
@ClassErrorMiddleware(errorHandlerMiddleware)
@Controller('clientes')
export default class ClienteController {
  constructor(
    @inject(TYPES.GetAllClientesUseCase)
    private getAllClientesUseCase: GetAllClientesUseCase,
    @inject(TYPES.ListarClientesCoordenadasUseCase)
    private listarClientesUseCase: ListarClientesCoordenadasUseCase,
    @inject(TYPES.CadastrarClienteUseCase)
    private cadastrarClienteUseCase: CadastrarClienteUseCase,
    @inject(TYPES.RotaOtimizadaUseCase)
    private rotaOtimizadaUseCase: RotaOtimizadaUseCase,
  ) {}

  @Post('cadastro')
  async cadastrarCliente(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const clienteDTO: ICadastrarClienteDTO = req.body

    const registeredCliente = await this.cadastrarClienteUseCase.execute(
      clienteDTO,
    )

    if ('error' in registeredCliente) {
      const err = {
        statusCode: StatusCodes.BAD_REQUEST,
        message: ReasonPhrases.BAD_REQUEST,
        data: registeredCliente.error,
      }

      return next(err)
    }

    res.status(StatusCodes.CREATED).json(registeredCliente)
  }

  @Get('')
  async getAllClientes(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const clientes = await this.getAllClientesUseCase.execute()
    res.status(StatusCodes.OK).json(clientes)
    if ('error' in clientes) {
      const err = {
        statusCode: StatusCodes.BAD_REQUEST,
        message: ReasonPhrases.BAD_REQUEST,
        data: clientes.error,
      }

      return next(err)
    }
  }

  @Get('rota')
  async calcularRotaOtimizada(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const coordenadas = await this.listarClientesUseCase.execute()
    let points = coordenadas.map(function (coordenada: Coordenada) {
      return new CalculoRota(coordenada.x, coordenada.y, false)
    })
    const rota = await this.rotaOtimizadaUseCase.execute(points)

    if ('error' in coordenadas) {
      const err = {
        statusCode: StatusCodes.BAD_REQUEST,
        message: ReasonPhrases.BAD_REQUEST,
        data: coordenadas.error,
      }

      return next(err)
    }

    res.status(StatusCodes.OK).json(rota)
  }
}
