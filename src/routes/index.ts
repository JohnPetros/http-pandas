import { IRouter } from '@app/interfaces/IRouter'
import { ROUTES } from '@constants/routes'
import { GetPandaByStatusCodeController } from '@modules/api/controllers/GetPandaByStatusCodeController'

const getPandaByStatusCodeController = new GetPandaByStatusCodeController()

export function routes(router: IRouter) {
  // router.get(ROUTES.index, getPandaByStatusCodeController)
  router.get(ROUTES.api.getPandaByStatusCode, getPandaByStatusCodeController)

  return router
}
