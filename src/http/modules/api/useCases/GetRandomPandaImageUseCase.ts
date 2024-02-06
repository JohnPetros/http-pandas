import type { BunFile } from 'bun'
import type { StatusCode } from 'types/StatusCode'

import { IUseCase } from '@app/interfaces/IUseCase'

import type { Panda } from 'types/Panda'
import { HTTP_STATUS } from '@constants/http-status'

export class GetRandomPandaImageUseCase implements IUseCase<void, Panda> {
  async execute(): Promise<Panda> {
    const randomIndex = Math.floor(
      Math.random() * Object.keys(HTTP_STATUS).length,
    )
    const randomStatusCode = Object.keys(HTTP_STATUS)
    const randomStatusMessage = HTTP_STATUS[randomStatusCode]

    const panda: Panda = {
      statusCode: randomStatusCode,
      statusMessage: randomStatusMessage,
    }
  }
}
