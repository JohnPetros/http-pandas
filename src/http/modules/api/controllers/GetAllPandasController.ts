import type { StatusCode } from '@core-types/StatusCode'

import { ICrontroller } from 'app/interfaces/ICrontroller'
import { GetPandaByStatusCodeFactory } from '../factories/GetPandaByStatusCodeFactory'

import { IHttp } from '@app/interfaces/IHttp'
import { HTTP_STATUS } from '@constants/http-status'

export class GetAllPandasController implements ICrontroller {
  async handle(http: IHttp): Promise<JSON> {
    const getPandaByStatusCodeFactory = new GetPandaByStatusCodeFactory()
    const getPandaByStatusCodeUseCase = getPandaByStatusCodeFactory.getUseCase()

    const pandas = []

    for (const statusCode of Object.keys(HTTP_STATUS)) {
      const panda = await getPandaByStatusCodeUseCase.execute({
        statusCode: statusCode as unknown as StatusCode,
        isRaw: true,
      })

      pandas.push({ ...panda, image: '' })
    }

    return http.send(200, pandas)
  }
}
