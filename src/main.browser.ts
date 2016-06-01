import {bootstrap} from '@angular/platform-browser-dynamic';
import {enableProdMode, provide} from '@angular/core';
import {HTTP_PROVIDERS, Http} from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';

import {TranslateService, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import {MarkedService} from './app/base/marked/marked.service';
import {http} from './app/base/injector/http-injector';

import {RootAppComponent} from './app/app.component';

function main(): Promise<any> {

  if ('production' === ENV) {
    // Production
    enableProdMode();

  } else {
    // Development
    // enableProdMode();
    GLOBAL_VALUE.PIC_STATIC_URL_HOST = '';
  }

  return bootstrap(RootAppComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(TranslateLoader, {
      useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
      deps: [Http]
    }),
    // provide(TranslateLoader, {
    //   useFactory: () => new TranslateStaticLoader(http, 'assets/i18n', '.json')
    // }),
    TranslateService,
    MarkedService
  ])
  .catch(err => console.error(err));
}

document.addEventListener('DOMContentLoaded', () => main());
