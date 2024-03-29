import { ICrontroller } from 'app/interfaces/ICrontroller'
import { IHttp } from 'app/interfaces/IHttp'

import { GetRandomPandaFactory } from '../factories/GetRandomPandaByStatusCodeFactory'
import { Response } from '@http/types/Response'

export class GetRawRandomPandaController implements ICrontroller {
  async handle(http: IHttp): Promise<Response> {
    const getRandomPandaFactory = new GetRandomPandaFactory()
    const getRandomPandaUseCase = getRandomPandaFactory.getUseCase()

    const panda = await getRandomPandaUseCase.execute(true)

    return http.send(panda.statusCode, Bun.file(panda.image))
  }
}
