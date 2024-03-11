import { IHttp } from './IHttp'

export interface IView {
  render(http: IHttp): Promise<string>
}
