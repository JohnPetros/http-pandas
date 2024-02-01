export interface IApp {
  startServer(port: number, onStart: () => void): void
  stopServer(message: string): void
}
