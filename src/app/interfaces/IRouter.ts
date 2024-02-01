import { ICrontroller } from './ICrontroller'

export interface IRouter {
  get(route: string, controller: ICrontroller): void
}
