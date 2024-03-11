import { IHttp } from '@app/interfaces/IHttp'
import { IView } from '@app/interfaces/IView'

import { RootLayout } from 'site/layouts/RootLayout'
import { Home } from 'site/pages/Home'

export class HomePageView implements IView {
  async render(http: IHttp): Promise<string> {
    return http.renderView(
      <RootLayout>
        <Home />
      </RootLayout>
    )
  }
}
