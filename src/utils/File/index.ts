import fs from 'node:fs'
import path from 'node:path'
import { BunFile } from 'bun'

import { AppError } from '@utils/AppError'
import { FILE_ERRORS } from './constants/file-errors'

export class File {
  private bunFile: BunFile
  filePath: string

  constructor(folder: string, fileName: string) {
    const name = fileName

    const filePath = path.resolve(folder, name)

    this.filePath = filePath
    this.bunFile = Bun.file(filePath)
  }

  async exists() {
    try {
      const oi = await this.bunFile.exists()
      console.log({ oi })
    } catch (error) {
      throw new AppError(FILE_ERRORS.exists, 500)
    }
  }

  write(chunck: string | Buffer) {
    console.log('WRITE')
    const writer = this.bunFile.writer()
    writer.write(chunck)
  }

  get() {
    return this.bunFile
  }

  async delete() {
    try {
      fs.unlinkSync(this.filePath)
      console.log('DELETE')
    } catch (error) {
      throw new AppError(FILE_ERRORS.delete, 500)
    }
  }
}
