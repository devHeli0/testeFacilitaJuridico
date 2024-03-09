import 'reflect-metadata'
import 'dotenv/config'
import { Server } from '@overnightjs/core'
import cors from 'cors'
import bodyParser from 'body-parser'
import { errorHandlerMiddleware } from './middlewares/'
import { ClienteController } from './Adapter/Controllers'
import { container } from './Infrastructure/Config/inversify.config'

class App extends Server {
  private readonly port: number = 3000
  private readonly inversifyContainer = container

  constructor() {
    super(true)
    this.inversifyContainer
    this.configureMiddleware()
    this.setupControllers()
    this.listen()
  }

  public getApp() {
    return this.app
  }

  private configureMiddleware() {
    this.app.use(cors())
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(errorHandlerMiddleware)
  }

  private setupControllers() {
    const clienteController = this.inversifyContainer.resolve(ClienteController)
    super.addControllers([clienteController])
  }

  private listen(): void {
    this.app.listen(this.port, () =>
      console.log(`App is running on http://localhost:${this.port}`),
    )
  }
}

export default new App().getApp()
