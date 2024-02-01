export interface IHttp {
  getBody<Body>(): Body
  getParams<Params>(): Params
  send<Response>(statusCode: number, response: Response): Response
}
