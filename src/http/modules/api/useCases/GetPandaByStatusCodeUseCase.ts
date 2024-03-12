import type { Panda } from '@core-types/Panda'

import { IUseCase } from '@app/interfaces/IUseCase'

import { IImageProcessingProvider } from '@providers/ImageProcessingProvider/IImageProcessingProvider'
import { IValidationProvider } from '@providers/validation/IValidationProvider'

import { File } from '@utils/File'
import { FOLDERS } from '@utils/File/constants/folders'
import { HTTP_STATUS } from '@constants/http-status'
import { GetPandaByStatusCodeRequest } from '../types/GetPandaByStatusCodeRequest'

export class GetPandaByStatusCodeUseCase
  implements IUseCase<GetPandaByStatusCodeRequest, Panda>
{
  private validationProvider: IValidationProvider
  private imageProcessingProvider: IImageProcessingProvider

  constructor(
    validationProvider: IValidationProvider,
    imageProcessingProvider: IImageProcessingProvider
  ) {
    this.validationProvider = validationProvider
    this.imageProcessingProvider = imageProcessingProvider
  }

  async execute({ statusCode, isRaw }: GetPandaByStatusCodeRequest): Promise<Panda> {
    await this.validationProvider.validateStatusCode(statusCode)

    const filename = `${statusCode}.jpg`
    const file = new File(FOLDERS.public.images, filename)

    const statusMessage = HTTP_STATUS[statusCode]

    let image = file.filePath

    if (!isRaw) {
      const pandaImageFile = new File(FOLDERS.tmp.images, `${crypto.randomUUID()}.jpg`)

      this.imageProcessingProvider.process(file.filePath)
      this.imageProcessingProvider.resize({ width: 500, height: 500 })
      this.imageProcessingProvider.addBorder()
      this.imageProcessingProvider.addText({
        body: statusMessage,
      })
      this.imageProcessingProvider.convertToJpg()

      const imageBuffer = await this.imageProcessingProvider.convertToBuffer()
      pandaImageFile.write(imageBuffer)

      image = pandaImageFile.filePath

      setTimeout(async () => {
        await pandaImageFile.delete()
      }, 100)
    }

    const panda: Panda = {
      statusCode,
      statusMessage: HTTP_STATUS[statusCode],
      image,
    }

    return panda
  }
}
