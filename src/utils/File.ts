import fs from 'node:fs'
import path from 'node:path'
import { AppError } from './AppError'
import { ERRORS } from '@constants/errors'
import { BunFile } from 'bun'

export class File {
  private file: BunFile
  filePath: string

  constructor(folder: string, fileName: string) {
    const filePath = path.resolve(folder, fileName)

    const fileExists = fs.existsSync(filePath)
    if (!fileExists) throw new AppError(ERRORS.utils.file.notFound, 500)

    this.filePath = filePath
    this.file = Bun.file(filePath)
  }

  get() {
    return this.file
  }

  async delete() {
    try {
      await fs.promises.unlink(this.filePath)
    } catch (error) {
      throw new AppError(ERRORS.utils.file.notDeleted, 500)
    }
  }
}
