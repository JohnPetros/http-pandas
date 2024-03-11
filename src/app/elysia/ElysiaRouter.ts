import { ICrontroller } from 'app/interfaces/ICrontroller'
import { IRouter } from 'app/interfaces/IRouter'
import { Elysia } from 'elysia'
import { ElysiaHttp } from './ElysiaHttp'
import { IView } from '@app/interfaces/IView'

export class ElysiaRouter implements IRouter {
  elysia: Elysia

  constructor(elysia: Elysia) {
    this.elysia = elysia
  }

  get(route: string, handler: ICrontroller | IView): void {
    this.elysia.get(route, (context) => {
      const elysiaHttp = new ElysiaHttp(context)

      if ('handle' in handler) {
        return handler.handle(elysiaHttp)
      }

      if ('render' in handler) {
        return handler.render(elysiaHttp)
      }
    })
  }
}
