import Redis, { RedisOptions } from 'ioredis'

import { ICache } from '@cache/ICache'

import { AppError } from '@utils/AppError'

const USERNAME = Bun.env.REDIS_USERNAME
const PASSWORD = Bun.env.REDIS_PASSWORD
const HOST = Bun.env.REDIS_HOST
const PORT = Bun.env.REDIS_PORT

export class RedisCache implements ICache {
  private redis: Redis

  constructor() {
    if (!HOST || !USERNAME || !PASSWORD || !PORT)
      throw new AppError('Redis url connection is not provided')

    let redisOptions: Partial<RedisOptions> = {}

    redisOptions = {
      host: HOST,
      username: USERNAME,
      password: PASSWORD,
      port: Number(PORT),
      tls: {},
    }

    try {
      this.redis = new Redis(redisOptions)
    } catch (error) {
      throw new AppError('Redis connection error')
    }

    return
  }

  async set(key: string, data: unknown): Promise<void> {
    await this.redis.set(key, JSON.stringify(data))
  }

  async get(key: string): Promise<string | null> {
    const data = await this.redis.get(key)
    if (data) return JSON.parse(data)

    return null
  }

  async remove(key: string): Promise<void> {
    await this.redis.del(key)
  }
}
