import { IHttp } from 'app/interfaces/IHttp'
import { Context } from 'elysia'

export class ElysiaHttp implements IHttp {
  private context: Context

  constructor(Context: Context) {
    this.context = Context
  }

  getBody<Body>(): Body {
    return this.context.body as Body
  }

  getParams<Params>(): Params {
    return this.context.params as Params
  }

  send<Response>(statusCode: number, response: Response): Response {
    this.context.set.status = statusCode

    return response
  }
}
