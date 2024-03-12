import type { Panda } from '@core-types/Panda'

import { GetPandaByStatusCodeUseCase } from '../useCases/GetPandaByStatusCodeUseCase'
import type { GetPandaByStatusCodeRequest } from '../types/GetPandaByStatusCodeRequest'

import { IFactory } from '@app/interfaces/IFactory'

import { SharpImageProcessingProvider } from '@providers/ImageProcessingProvider/sharp'
import { ZodValidationProvider } from '@providers/ValidationProvider/zod'

export class GetPandaByStatusCodeFactory
  implements IFactory<GetPandaByStatusCodeRequest, Panda>
{
  useCase: GetPandaByStatusCodeUseCase

  constructor() {
    const imageProcessorProvider = new SharpImageProcessingProvider()
    const zodValidationProvider = new ZodValidationProvider()

    this.useCase = new GetPandaByStatusCodeUseCase(
      zodValidationProvider,
      imageProcessorProvider
    )
  }

  getUseCase() {
    return this.useCase
  }
}
