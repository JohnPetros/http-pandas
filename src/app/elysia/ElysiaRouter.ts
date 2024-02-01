import { ICrontroller } from 'app/interfaces/ICrontroller'
import { IRouter } from 'app/interfaces/IRouter'
import { Elysia as ElysiaInstance } from 'elysia'
import { ElysiaHttp } from './ElysiaHttp'

export class ElysiaRouter implements IRouter {
  private elysia: ElysiaInstance

  constructor(elysia: ElysiaInstance) {
    this.elysia = elysia
  }

  get(route: string, controller: ICrontroller): void {
    this.elysia.get(route, (context) => {
      const elysiaHttp = new ElysiaHttp(context)

      controller.handle(elysiaHttp)
    })
  }
}
