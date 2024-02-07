import { ICrontroller } from 'app/interfaces/ICrontroller'
import { IHttp } from 'app/interfaces/IHttp'

import { GetRandomPandaFactory } from '../factories/GetRandomPandaByStatusCodeFactory'

export class GetRandomPandaController implements ICrontroller {
  async handle(http: IHttp): Promise<JSON> {
    const getRandomPandaFactory = new GetRandomPandaFactory()
    const getRandomPandaUseCase = getRandomPandaFactory.getUseCase()

    const panda = await getRandomPandaUseCase.execute(false)

    return http.send(panda.statusCode, Bun.file(panda.image))
  }
}
