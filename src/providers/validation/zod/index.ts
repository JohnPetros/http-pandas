import { ZodError } from 'zod'
import { StatusCode } from 'types/StatusCode'

import { statusCodeShema } from './schemas/statusCodeSchema'
import { IValidationProvider } from '../IValidationProvider'
import { AppError } from '@utils/AppError'

export class ZodValidationProvider implements IValidationProvider {
  private handleError(error: unknown) {
    if (error instanceof ZodError) {
      console.log(error)
      throw new AppError(
        error.errors.map((error) => error.message).join('; '),
        400,
      )
    }
  }

  async validateStatusCode(statusCode: StatusCode): Promise<void> {
    try {
      statusCodeShema.parse(statusCode)
    } catch (error) {
      this.handleError(error)
    }
  }
}
