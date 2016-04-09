import {bootstrap} from 'angular2/platform/browser';
import {enableProdMode, provide} from 'angular2/core';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';

import {TranslateService, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';

import {LocalStorageService} from './app/base/local-storage/local-storage.service';
import {UserService} from './app/user/user.service';
import {HttpUtilsService} from './app/base/utils/http-utils.service';

// TODO: only need UrlSafeBase64Service
import {Utf8Service} from './app/base/base64/utf8.service';
import {Base64Service} from './app/base/base64/base64.service';
import {UrlSafeBase64Service} from './app/base/base64/base64safe.service';

import {RootAppComponent} from './app/app.component';

enableProdMode();

bootstrap(RootAppComponent, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(TranslateLoader, {
    useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
    deps: [Http]
  }),
  TranslateService,
  Utf8Service,
  Base64Service,
  UrlSafeBase64Service,
  LocalStorageService,
  UserService,
  HttpUtilsService
])
.catch(err => console.error(err));
