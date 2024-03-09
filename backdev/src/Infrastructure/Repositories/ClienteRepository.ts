import { inject, injectable } from 'inversify'
import { Cliente } from '../../Domain/Entities/'
import { IClienteRepository } from '../../Domain/Repositories'
import { Pool } from 'pg'
import {
  ICadastrarClienteDTO,
  ICadastrarCoordenadaDTO,
} from '../../Application/DTOs'
import { PostgresPool, TYPES } from '../Config/'
import Coordenada from '../../Domain/Entities/Coordenada'

@injectable()
export default class ClienteRepository implements IClienteRepository {
  private readonly pool: Pool

  constructor(@inject(TYPES.PostgresPool) postgresPool: PostgresPool) {
    this.pool = postgresPool.getPool()
  }

  async cadastrar(
    clienteDTO: ICadastrarClienteDTO & ICadastrarCoordenadaDTO,
  ): Promise<Cliente> {
    const {
      nome,
      email,
      telefone,
      coordenada: { x, y },
    } = clienteDTO

    const client = await this.pool.connect()
    await client.query('BEGIN')

    const resultClientes = await client.query(
      'INSERT INTO clientes (nome, email, telefone) VALUES ($1, $2, $3) RETURNING id',
      [nome, email, telefone],
    )

    const clienteId = resultClientes.rows[0].id

    const resultCoordenadas = await client.query(
      'INSERT INTO coordenadas (clienteId, x, y) VALUES ($1, $2, $3) RETURNING *',
      [clienteId, x, y],
    )

    await client.query('COMMIT')

    const registeredCliente = Cliente.cadastrar({
      id: clienteId,
      nome,
      email,
      telefone,
      coordenada: {
        x: resultCoordenadas.rows[0].x,
        y: resultCoordenadas.rows[0].y,
      },
    })

    return registeredCliente
  }

  async listarClientesCoordenadas(): Promise<Coordenada[]> {
    const result = await this.pool.query({
      text: 'SELECT clienteid, x, y FROM coordenadas',
    })
    const allClients = result.rows
    return allClients
  }

  async getAllClientes(): Promise<Cliente[]> {
    const query = `
      SELECT c.id, c.nome, c.email, c.telefone, co.x as coordenada_x, co.y as coordenada_y
      FROM clientes c
      LEFT JOIN coordenadas co ON c.id = co.clienteId
    `
    const result = await this.pool.query(query)

    const clientes = result.rows.map((row) => {
      const coordenada = new Coordenada(row.coordenada_x, row.coordenada_y)
      return new Cliente(row.nome, row.email, row.telefone, coordenada, row.id)
    }) as Cliente[]

    return clientes
  }
}
