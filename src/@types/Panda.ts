import { StatusCode } from './StatusCode'
import { StatusMessage } from './StatusMessage'

export type Panda = {
  statusCode: StatusCode
  statusMessage: StatusMessage
  image: string
}
