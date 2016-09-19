import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './app/app.module'

function main(): Promise<any> {

  if ('production' === ENV) {
    // Production
    enableProdMode()

  } else {
    // Development
    GLOBAL_VALUE.PIC_STATIC_URL_HOST = ''
  }

  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err))
}

document.addEventListener('DOMContentLoaded', () => main())
