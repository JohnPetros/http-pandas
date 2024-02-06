import { ICrontroller } from 'app/interfaces/ICrontroller'
import { IHttp } from 'app/interfaces/IHttp'
import { GetPandaImageByStatusCodeFactory } from '../factories/GetPandaImageByStatusCodeFactory'
import { StatusCode } from 'types/StatusCode'

export class GetPandaImageController implements ICrontroller {
  async handle(http: IHttp): Promise<JSON> {
    const { statusCode } = http.getParams<{ statusCode: StatusCode }>()

    const getPandaByStatusCodeFactory = new GetPandaImageByStatusCodeFactory()
    const getPandaByStatusCodeUseCase = getPandaByStatusCodeFactory.getUseCase()

    const pandaImage = await getPandaByStatusCodeUseCase.execute(statusCode)

    return http.send(200, pandaImage)
  }
}
