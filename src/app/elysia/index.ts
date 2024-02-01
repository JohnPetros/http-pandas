import { routes } from '@routes/index'
import { IApp } from 'app/interfaces/IApp'
import { Elysia } from 'elysia'
import { ElysiaRouter } from './ElysiaRouter'

export class ElysiaApp implements IApp {
  private elysia: Elysia

  constructor() {
    const elysia = new Elysia()

    const elysiaRouter = new ElysiaRouter(elysia)

    routes(elysiaRouter)

    elysia.use(elysiaRouter.getRouterInstance())

    this.elysia = elysia
  }

  startServer(port: number, onStart: () => void): void {
    this.elysia.listen(port)
    onStart()
  }

  stopServer(message: string = 'The server is stopped 😴.'): void {
    this.elysia
      .stop()
      .then(() => console.log(message))
      .catch((error) =>
        console.error("The server couldn't be stopped 😨. ERROR: " + error),
      )
  }
}
