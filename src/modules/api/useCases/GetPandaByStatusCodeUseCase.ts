import { IUseCase } from '@app/interfaces/IUseCase'
import { ERRORS } from '@constants/errors'
import { FOLDERS } from '@constants/folders'
import { AppError } from '@utils/AppError'
import { File } from '@utils/File'
import { BunFile } from 'bun'
import { readFile } from 'node:fs/promises'
import sharp from 'sharp'

export class GetPandaByStatusCodeUseCase implements IUseCase<number, BunFile> {
  async execute(statusCode: number): Promise<BunFile> {
    if (!statusCode) throw new AppError(ERRORS.api.statusCodeNotFound, 401)

    if (typeof statusCode === 'number')
      throw new AppError(ERRORS.api.statusCodeIsNaN, 401)

    const filename = `${statusCode}.jpg`
    const file = new File(FOLDERS.public.images, filename)

    const text = Buffer.from(` <svg width="200" height="200">
    <style>
        .title { fill: #f00; font-size: 16px; font-weight: bold;}
    </style>
 <text x="50%" y="8%" text-anchor="middle" class="title">TEXTO</text>
 </svg>`)

    const _file = Bun.file('./output.jpg')
    const writer = _file.writer()

    const image = await sharp(file.filePath)
      .resize(400, 400)
      .extend({
        top: 25,
        bottom: 100,
        left: 25,
        right: 25,
        background: '#FFFFFF',
      })
      .composite([
        {
          input: text,
          gravity: 'south',
        },
      ])
      .jpeg()
      .toBuffer()

    writer.write(image)

    console.log('ok')

    // return file.get()
  }
}
