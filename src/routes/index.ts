import { IRouter } from '@app/interfaces/IRouter'
import { ROUTES } from './constants/routes'
import { GetPandaImageByStatusCodeController } from '@modules/api/controllers/GetPandaImageByStatusCodeController'

const getPandaImageByStatusCodeController =
  new GetPandaImageByStatusCodeController()

export function routes(router: IRouter) {
  // router.get(ROUTES.index, getPandaByStatusCodeController)
  router.get(
    ROUTES.api.getPandaImageByStatusCode,
    getPandaImageByStatusCodeController,
  )

  return router
}
