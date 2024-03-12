import type { Panda } from '@core-types/Panda'

import { SharpImageProcessingProvider } from '@providers/ImageProcessingProvider/sharp'
import { IFactory } from '@app/interfaces/IFactory'
import { GetRandomPandaUseCase } from '../useCases/GetRandomPandaUseCase'

export class GetRandomPandaFactory implements IFactory<boolean, Panda> {
  useCase: GetRandomPandaUseCase

  constructor() {
    const imageProcessorProvider = new SharpImageProcessingProvider()

    this.useCase = new GetRandomPandaUseCase(imageProcessorProvider)
  }

  getUseCase() {
    return this.useCase
  }
}
