import { ICrontroller } from 'app/interfaces/ICrontroller'
import { IHttp } from 'app/interfaces/IHttp'
import { GetPandaByStatusCodeUseCase } from '../useCases/GetPandaByStatusCodeUseCase'

export class GetPandaByStatusCodeController implements ICrontroller {
  async handle(http: IHttp): Promise<JSON> {
    const { statusCode } = http.getParams<{ statusCode: number }>()

    const getPandaByStatusCodeUseCase = new GetPandaByStatusCodeUseCase()

    const panda = await getPandaByStatusCodeUseCase.execute(statusCode)

    console.log(panda)

    return http.send(200, 'ok')
  }
}
