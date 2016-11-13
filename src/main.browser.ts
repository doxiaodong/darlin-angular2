import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { bootloader } from '@angularclass/hmr'

import { AppModule } from './app/app.module'

function main(): Promise<any> {

  if ('production' === ENV) {
    enableProdMode()
  } else {
    GLOBAL_VALUE.PIC_STATIC_URL_HOST = ''
  }

  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err))
}

bootloader(main)
// document.addEventListener('DOMContentLoaded', () => main())
