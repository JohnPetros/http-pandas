import { IRouter } from '@app/interfaces/IRouter'
import { ROUTES } from './constants/routes'
import { GetRandomPandaController } from 'http/modules/api/controllers/GetRandomPandaController'
import { GetPandaByStatusCodeController } from 'http/modules/api/controllers/GetPandaByStatusCodeController'

const getPandaByStatusCodeController = new GetPandaByStatusCodeController()
const getRandomPandaController = new GetRandomPandaController()

export function routes(router: IRouter) {
  // router.get(ROUTES.index, getPandaByStatusCodeController)
  router.get(ROUTES.api.getPandaByStatusCode, getPandaByStatusCodeController)
  router.get(ROUTES.api.getRandomPanda, getRandomPandaController)
  router.get(ROUTES.api.getRawPandayStatusCode, getRandomPandaController)
  router.get(ROUTES.api.getRandomRawPanda, getRandomPandaController)

  return router
}
