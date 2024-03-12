import { IHttp } from '@app/interfaces/IHttp'
import { IView } from '@app/interfaces/IView'

import { RootLayout } from '@ui/layouts/RootLayout'
import { Home } from '@ui/pages/Home'

export class HomePageView implements IView {
  async render(http: IHttp): Promise<string> {
    const clipboardScript = await Bun.file(
      './node_modules/clipboard/dist/clipboard.min.js'
    ).text()

    const prelineScript = await Bun.file('./node_modules/preline/dist/preline.js').text()

    return http.renderView(
      <RootLayout scripts={[clipboardScript, prelineScript]}>
        <Home />
      </RootLayout>
    )
  }
}
