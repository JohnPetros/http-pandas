import { IUseCase } from './IUseCase'

export interface IFactory<Request, Response> {
  getUseCase(): IUseCase<Request, Response>
}
