import { ICrontroller } from './ICrontroller'
import { IView } from './IView'

export interface IRouter {
  get(route: string, handler: ICrontroller | IView): void
}
