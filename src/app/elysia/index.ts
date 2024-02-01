import { IApp } from 'app/interfaces/IApp'
import { Elysia } from 'elysia'

export class ElysiaApp implements IApp {
  private elysia: Elysia

  constructor() {
    this.elysia = new Elysia()
  }

  startServer(port: number, onStart: () => void): void {
    this.elysia.listen(port)
    onStart()
  }

  stopServer(message: string = 'The server is stopped 😴.'): void {
    this.elysia
      .stop()
      .then(() => console.log(message))
      .catch((error) =>
        console.error("The server couldn't be stopped 😨. ERROR: " + error),
      )
  }
}
