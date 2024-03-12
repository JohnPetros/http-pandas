import type { Panda } from '@core-types/Panda'
import type { StatusCode } from '@core-types/StatusCode'

import { IUseCase } from '@app/interfaces/IUseCase'

import { HTTP_STATUS } from '@constants/http-status'

import { File } from '@utils/File'
import { FOLDERS } from '@utils/File/constants/folders'
import { IImageProcessingProvider } from '@providers/ImageProcessingProvider/IImageProcessingProvider'

export class GetRandomPandaUseCase implements IUseCase<boolean, Panda> {
  private imageProcessingProvider: IImageProcessingProvider

  constructor(imageProcessingProvider: IImageProcessingProvider) {
    this.imageProcessingProvider = imageProcessingProvider
  }

  async execute(isRaw: boolean): Promise<Panda> {
    const randomIndex = Math.floor(Math.random() * Object.keys(HTTP_STATUS).length)

    const randomStatusCode = Object.keys(HTTP_STATUS)[
      randomIndex
    ] as unknown as StatusCode

    const randomStatusMessage = HTTP_STATUS[randomStatusCode]

    const filename = `${randomStatusCode}.jpg`

    const file = new File(FOLDERS.public.images, filename)

    const pandaImageFile = new File(FOLDERS.tmp.images, crypto.randomUUID() + '.jpg')

    if (!isRaw) {
      this.imageProcessingProvider.process(file.filePath)
      this.imageProcessingProvider.resize({ width: 500, height: 500 })
      this.imageProcessingProvider.addBorder()
      this.imageProcessingProvider.addText({
        body: randomStatusMessage,
      })
      this.imageProcessingProvider.convertToJpg()

      const imageBuffer = await this.imageProcessingProvider.convertToBuffer()
      pandaImageFile.write(imageBuffer)
    }

    setTimeout(async () => {
      await pandaImageFile.delete()
    }, 100)

    const panda: Panda = {
      statusCode: randomStatusCode,
      statusMessage: randomStatusMessage,
      image: file.filePath,
    }

    return panda
  }
}
