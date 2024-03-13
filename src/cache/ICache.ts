export interface ICache {
  set(key: string, data: unknown): Promise<void>
  get(key: string): Promise<string | null>
  remove(key: string): Promise<void>
}
