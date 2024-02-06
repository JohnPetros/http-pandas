import { GetPandaImageByStatusCodeUseCase } from '../useCases/GetPandaImageByStatusCodeUseCase'
import { IFactory } from '@app/interfaces/IFactory'
import { BunFile } from 'bun'
import { SharpImageProcessingProvider } from '@providers/imageProcessingProvider/sharp'
import { ZodValidationProvider } from '@providers/validation/zod'

export class GetPandaImageByStatusCodeFactory
  implements IFactory<number, BunFile>
{
  useCase: GetPandaByStatusCodeUseCase

  constructor() {
    const imageProcessorProvider = new SharpImageProcessingProvider()
    const zodValidationProvider = new ZodValidationProvider()

    this.useCase = new GetPandaImageByStatusCodeUseCase(
      zodValidationProvider,
      imageProcessorProvider,
    )
  }

  getUseCase() {
    return this.useCase
  }
}
