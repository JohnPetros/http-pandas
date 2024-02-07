import type { StatusCode } from '@core-types/StatusCode'

import { ICrontroller } from 'app/interfaces/ICrontroller'
import { GetPandaByStatusCodeFactory } from '../factories/GetPandaByStatusCodeFactory'

import { IHttp } from '@app/interfaces/IHttp'

export class GetPandaByStatusCodeController implements ICrontroller {
  async handle(http: IHttp): Promise<JSON> {
    const { statusCode } = http.getParams<{ statusCode: StatusCode }>()

    const getPandaByStatusCodeFactory = new GetPandaByStatusCodeFactory()
    const getPandaByStatusCodeUseCase = getPandaByStatusCodeFactory.getUseCase()

    const panda = await getPandaByStatusCodeUseCase.execute({
      statusCode,
      isRaw: false,
    })

    return http.send(panda.statusCode, Bun.file(panda.image))
  }
}
