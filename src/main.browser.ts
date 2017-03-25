import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { bootloader } from '@angularclass/hmr'

import { AppModule } from './app'

function main(): Promise<any> {

  if ('production' === ENV) {
    enableProdMode()
  }

  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
}

bootloader(main)
