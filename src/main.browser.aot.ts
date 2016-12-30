import { enableProdMode } from '@angular/core'
import { platformBrowser } from '@angular/platform-browser'
import { AppModuleNgFactory } from '../compiled/src/app/app.module.ngfactory'

function main(): Promise<any> {
  if ('production' === ENV) {
    enableProdMode()
  } else {
    GLOBAL_VALUE.PIC_STATIC_URL_HOST = ''
  }

  return platformBrowser()
    .bootstrapModuleFactory(AppModuleNgFactory)
}

export function bootstrapDomReady() {
  document.addEventListener('DOMContentLoaded', main)
}

bootstrapDomReady()
