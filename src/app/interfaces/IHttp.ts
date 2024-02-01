export interface IHttp {
  getBody<Body>(): Body
  getParams<Params>(): Params
  setHeaders(key: string, value: string): void
  send<Response>(statusCode: number, response: Response): JSON
}
