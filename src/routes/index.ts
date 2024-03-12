import { IRouter } from '@app/interfaces/IRouter'
import { ROUTES } from './constants/routes'
import { GetRandomPandaController } from 'http/modules/api/controllers/GetRandomPandaController'
import { GetPandaByStatusCodeController } from 'http/modules/api/controllers/GetPandaByStatusCodeController'
import { GetRawPandaByStatusCodeController } from 'http/modules/api/controllers/GetRawPandaByStatusCodeController'
import { GetAllPandasController } from 'http/modules/api/controllers/GetAllPandasController'
import { HomePageView } from '@http/modules/ui/views/HomePageView'
import { PandasComponentView } from '@http/modules/ui/views/PandasComponentView'

const getPandaByStatusCodeController = new GetPandaByStatusCodeController()
const getRawPandaByStatusCodeController = new GetRawPandaByStatusCodeController()
const getRandomPandaController = new GetRandomPandaController()
const getAllPandasController = new GetAllPandasController()

const homePageView = new HomePageView()
const pandasComponentView = new PandasComponentView()

export function routes(router: IRouter) {
  router.get(ROUTES.index, homePageView)

  router.get(ROUTES.api.getPandaByStatusCode, getPandaByStatusCodeController)
  router.get(ROUTES.api.getRandomPanda, getRandomPandaController)
  router.get(ROUTES.api.getRawPandayStatusCode, getRawPandaByStatusCodeController)
  router.get(ROUTES.api.getRandomRawPanda, getRandomPandaController)
  router.get(ROUTES.api.getAllPandas, getAllPandasController)

  router.get(ROUTES.ui.pandas, pandasComponentView)

  return router
}
