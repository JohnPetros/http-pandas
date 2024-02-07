import { IHttp } from './IHttp'

export interface ICrontroller {
  handle(http: IHttp): Promise<JSON>
}
