import { ICrontroller } from 'app/interfaces/ICrontroller'
import { IRouter } from 'app/interfaces/IRouter'
import { Elysia } from 'elysia'
import { ElysiaHttp } from './ElysiaHttp'

export class ElysiaRouter implements IRouter {
  elysia: Elysia

  constructor(elysia: Elysia) {
    this.elysia = elysia
  }

  get(route: string, controller: ICrontroller): void {
    this.elysia.get(route, (context) => {
      const elysiaHttp = new ElysiaHttp(context)
      return controller.handle(elysiaHttp)
    })
  }
}
