import { IHttp } from '@app/interfaces/IHttp'
import { IView } from '@app/interfaces/IView'

import { HTTP_STATUS } from '@constants/http-status'
import { StatusCode } from '@core-types/StatusCode'

import { GetPandaByStatusCodeFactory } from '@http/modules/api/factories/GetPandaByStatusCodeFactory'

import { Pandas } from '@ui/components/Pandas'

export class PandasComponentView implements IView {
  async render(http: IHttp): Promise<string> {
    const getPandaByStatusCodeFactory = new GetPandaByStatusCodeFactory()
    const getPandaByStatusCodeUseCase = getPandaByStatusCodeFactory.getUseCase()

    const pandas = []

    for await (const panda of Object.keys(HTTP_STATUS).map((statusCode) =>
      getPandaByStatusCodeUseCase.execute({
        statusCode: statusCode as unknown as StatusCode,
        isRaw: false,
      })
    )) {
      pandas.push({
        ...panda,
        image: `http://localhost:3000/api/raw/${panda.statusCode}`,
      })
    }

    return http.renderView(<Pandas pandas={pandas} />)
  }
}
