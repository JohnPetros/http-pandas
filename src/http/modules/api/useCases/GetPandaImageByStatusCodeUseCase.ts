import type { BunFile } from 'bun'
import type { StatusCode } from 'types/StatusCode'

import { IUseCase } from '@app/interfaces/IUseCase'

import { IImageProcessingProvider } from '@providers/imageProcessingProvider/IImageProcessingProvider'
import { IValidationProvider } from '@providers/validation/IValidationProvider'
import { File } from '@utils/File'
import { FOLDERS } from '@utils/File/constants/folders'
import { HTTP_STATUS } from '@constants/http-status'

export class GetPandaImageByStatusCodeUseCase
  implements IUseCase<StatusCode, BunFile>
{
  private validationProvider: IValidationProvider
  private imageProcessingProvider: IImageProcessingProvider

  constructor(
    validationProvider: IValidationProvider,
    imageProcessingProvider: IImageProcessingProvider,
  ) {
    this.validationProvider = validationProvider
    this.imageProcessingProvider = imageProcessingProvider
  }

  async execute(statusCode: StatusCode): Promise<BunFile> {
    await this.validationProvider.validateStatusCode(statusCode)

    const filename = `${statusCode}.jpg`
    const file = new File(FOLDERS.public.images, filename)

    const statusMessage = HTTP_STATUS[statusCode]

    this.imageProcessingProvider.process(file.filePath)
    this.imageProcessingProvider.resize({ width: 500, height: 500 })
    this.imageProcessingProvider.addBorder()
    this.imageProcessingProvider.addText({
      body: statusMessage,
    })
    this.imageProcessingProvider.convertToJpg()

    const imageBuffer = await this.imageProcessingProvider.convertToBuffer()

    const pandaImageFile = new File(
      FOLDERS.tmp.images,
      crypto.randomUUID() + '.jpg',
    )

    pandaImageFile.write(imageBuffer)

    const pandaImage = pandaImageFile.get()

    setTimeout(async () => {
      await pandaImageFile.delete()
    }, 100)

    return pandaImage
  }
}
