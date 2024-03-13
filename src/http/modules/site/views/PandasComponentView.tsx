import { IHttp } from '@app/interfaces/IHttp'
import { IView } from '@app/interfaces/IView'

import { HTTP_STATUS } from '@constants/http-status'
import { Panda } from '@core-types/Panda'
import { StatusCode } from '@core-types/StatusCode'

import { GetPandaByStatusCodeFactory } from '@http/modules/api/factories/GetPandaByStatusCodeFactory'

import { Pandas } from '@ui/components/Pandas'

import { File } from '@utils/File'
import { FOLDERS } from '@utils/File/constants/folders'

export class PandasComponentView implements IView {
  async render(http: IHttp): Promise<string> {
    let pandas: Panda[] = []

    const pandasFile = new File(FOLDERS.cache, 'pandas.txt')

    try {
      const cachedPandas = await pandasFile.readText()
      pandas = JSON.parse(cachedPandas)
    } catch (error) {
      const getPandaByStatusCodeFactory = new GetPandaByStatusCodeFactory()
      const getPandaByStatusCodeUseCase = getPandaByStatusCodeFactory.getUseCase()

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

      pandasFile.write(JSON.stringify(pandas))
    }

    return http.renderView(<Pandas pandas={pandas} />)
  }
}
