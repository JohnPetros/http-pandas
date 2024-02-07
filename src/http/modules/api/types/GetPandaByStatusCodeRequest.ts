import type { StatusCode } from '@core-types/StatusCode'

export type GetPandaByStatusCodeRequest = {
  statusCode: StatusCode
  isRaw: boolean
}
