import { HTTP_STATUS } from '@constants/http-status'
import { VALIDATION_ERRORS } from '@providers/validation/constants/validation-errors'
import { z } from 'zod'

const codes = Object.keys(HTTP_STATUS).map(String)

const statusCode: [string, ...string[]] = [codes[0], ...codes]

export const statusCodeShema = z.enum(statusCode, {
  errorMap: () => {
    return { message: VALIDATION_ERRORS.statusCode.enum }
  },
})
