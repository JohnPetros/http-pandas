import { routes } from '@routes/index'
import { IApp } from 'app/interfaces/IApp'
import { Context, Elysia } from 'elysia'
import { ElysiaRouter } from './ElysiaRouter'
import { AppError } from '@utils/AppError'
import { VALIDATION_ERRORS } from '@providers/validation/constants/validation-errors'

export class ElysiaApp implements IApp {
  private elysia: Elysia

  constructor() {
    const elysia = new Elysia().onError(this.handleError)

    const elysiaRouter = new ElysiaRouter(elysia)

    routes(elysiaRouter)

    elysia.use(elysiaRouter.elysia)

    this.elysia = elysia
  }

  private handleError({ error, set }: Context & { error: unknown }) {
    console.error(error)

    if (error instanceof AppError) {
      if (error.message === VALIDATION_ERRORS.statusCode.enum) {
        set.redirect = '/api/404'
        return
      }

      set.status = error.statusCode
      return { status: error.statusCode, error: error.message }
    }
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
        console.error('The server could not be stopped 😨. ERROR: ' + error),
      )
  }
}
