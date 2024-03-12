import type { Border } from './types/Border'
import type { Text } from './types/Text'
import type { Size } from './types/size'

export interface IImageProcessingProvider {
  process(path: string): void
  resize(size: Size): void
  addBorder(border?: Border): void
  addText(text: Text): void
  convertToJpg(): void
  convertToBuffer(): Promise<Buffer>
}
