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

  addChunck(chunck: string | Buffer) {
    const writer = this.bunFile.writer()
    writer.write(chunck)
  }

  read() {
    return this.bunFile
  }

  async exists() {
    try {
      await this.bunFile.exists()
    } catch (error) {
      throw new AppError(FILE_ERRORS.exists, 500)
    }
  }

  async readText() {
    await this.exists()

    return await this.bunFile.text()
  }

  async write(text: string) {
    Bun.write(this.filePath, text)
  }

  async delete() {
    try {
      fs.unlinkSync(this.filePath)
    } catch (error) {
      throw new AppError(FILE_ERRORS.delete, 500)
    }
  }
}
