import { IHttp } from '@app/interfaces/IHttp'
import { IView } from '@app/interfaces/IView'

import { RootLayout } from '@ui/layouts/RootLayout'
import { Home } from '@ui/pages/Home'
import { AppError } from '@utils/AppError'

const DOMAIN = Bun.env.DOMAIN

export class HomePageView implements IView {
  async render(http: IHttp): Promise<string> {
    if (!DOMAIN) throw new AppError('App domain is not provided')

    const clipboardScript = await Bun.file(
      './node_modules/clipboard/dist/clipboard.min.js'
    ).text()

    const prelineScript = await Bun.file('./node_modules/preline/dist/preline.js').text()

    return http.renderView(
      <RootLayout scripts={[clipboardScript, prelineScript]}>
        <Home domain={DOMAIN} />
      </RootLayout>
    )
  }
}
