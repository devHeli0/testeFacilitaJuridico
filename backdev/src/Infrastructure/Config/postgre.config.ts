import { injectable } from 'inversify'
import { Pool } from 'pg'

@injectable()
export class PostgresPool {
  private readonly pool: Pool

  constructor() {
    const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } = process.env

    this.pool = new Pool({
      host: DB_HOST,
      port: Number(DB_PORT),
      database: DB_NAME,
      user: DB_USER,
      password: DB_PASS,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    })

    this.pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err)
    })
  }

  getPool(): Pool {
    return this.pool
  }
}
