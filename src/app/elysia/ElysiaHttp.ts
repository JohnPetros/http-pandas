import { Context } from 'elysia'
import { IHttp } from 'app/interfaces/IHttp'

type ElysiaContext = Context & { html: (html: string) => string }

export class ElysiaHttp implements IHttp {
  private context: ElysiaContext

  constructor(Context: Context) {
    this.context = Context as ElysiaContext
  }

  getBody<Body>(): Body {
    return this.context.body as Body
  }

  getParams<Params>(): Params {
    return this.context.params as Params
  }

  renderView(view: string): string {
    return this.context.html(view)
  }

  send<Response>(statusCode: number, response: Response): JSON {
    this.context.set.status = statusCode

    return response as JSON
  }

  setHeaders(key: string, value: string): void {
    this.context.set.headers[key] = value
  }
}
