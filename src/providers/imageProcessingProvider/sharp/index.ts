import sharp from 'sharp'

import type { Size } from '../types/size'
import type { Border } from '../types/Border'
import type { Text } from '../types/Text'

import { DEFAULT_SIZE } from '../constants/default-image'
import { DEFAULT_BORDER } from '../constants/default-border'
import { IMAGE_PROCESSING_ERRORS } from '../constants/image-processing-erros'

import { AppError } from '@utils/AppError'
import { IImageProcessingProvider } from '../IImageProcessingProvider'
import { DEFAULT_TEXT } from '../constants/default-text'

export class SharpImageProcessingProvider implements IImageProcessingProvider {
  private image: sharp.Sharp | null = null
  private size: Size = DEFAULT_SIZE
  private border: Border = DEFAULT_BORDER

  process(path: string) {
    this.image = sharp(path)
  }

  resize({ width, height }: Size = DEFAULT_SIZE) {
    if (!this.image) throw new AppError(IMAGE_PROCESSING_ERRORS.process)

    const resizedImage = this.image.resize(width, height)
    if (!resizedImage) throw new AppError(IMAGE_PROCESSING_ERRORS.resize)

    this.image = resizedImage
    this.size = { width, height }
  }

  addBorder(border: Border = DEFAULT_BORDER): void {
    if (!this.image) throw new AppError(IMAGE_PROCESSING_ERRORS.process)

    if (!this.image) throw new AppError(IMAGE_PROCESSING_ERRORS.process)
    const borderedImage = this.image.extend({
      top: border.topSize,
      bottom: border.bottomSize,
      left: border.leftSize,
      right: border.rightSize,
      background: border.background,
    })

    if (!borderedImage) throw new AppError(IMAGE_PROCESSING_ERRORS.addBorder)

    this.image = borderedImage
  }

  addText(text: Text): void {
    const body = text.body
    const color = text.color ?? DEFAULT_TEXT.color
    const fontSize = text.fontSize ?? DEFAULT_TEXT.fontSize

    const bufferText = Buffer.from(
      `<svg width="${this.size.width}" height="${this.size.height}">
      <style>
        .title { fill: ${color}; font-size: ${fontSize}px; font-weight: bold;}
      </style>
        <text x="50%" y="8%" text-anchor="middle" class="title">${body}</text>
    </svg>`,
    )

    if (!this.image) throw new AppError(IMAGE_PROCESSING_ERRORS.process)
    const imageWithText = this.image.composite([
      {
        input: bufferText,
        top:
          this.size.height +
          Math.floor(this.border.bottomSize / 2) -
          Number(fontSize) / 4,
        left: 25,
      },
    ])

    if (!imageWithText) throw new AppError(IMAGE_PROCESSING_ERRORS.addText)

    this.image = imageWithText
  }

  convertToJpg(): void {
    if (!this.image) throw new AppError(IMAGE_PROCESSING_ERRORS.process)
    const jpg = this.image.jpeg()

    if (!jpg) throw new AppError(IMAGE_PROCESSING_ERRORS.convertToJpg)

    this.image = jpg
  }

  async convertToBuffer(): Promise<Buffer> {
    if (!this.image) throw new AppError(IMAGE_PROCESSING_ERRORS.process)
    const buffer = await this.image.toBuffer()

    if (!buffer) throw new AppError(IMAGE_PROCESSING_ERRORS.convertToJpg)

    return buffer
  }
}
