import {bootstrap} from 'angular2/platform/browser';
import {enableProdMode, provide} from 'angular2/core';
import {HTTP_PROVIDERS, Http, BrowserXhr} from 'angular2/http';
import {CustomBrowserXhr} from './app/base/custom-browser-xhr/custom-browser-xhr.provide';
import {ROUTER_PROVIDERS} from 'angular2/router';

import {TranslateService, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';

import {LocalStorageService} from './app/base/local-storage/local-storage.service';
import {UserService} from './app/user/user.service';
import {HttpUtilsService} from './app/base/utils/http-utils.service';

import {UrlSafeBase64Service} from './app/base/base64/base64safe.service';
import {AlertService} from './app/base/alert/alert.service';
import {SignModalService} from './app/sign-modal/sign-modal.service';

import {RootAppComponent} from './app/app.component';

enableProdMode();

bootstrap(RootAppComponent, [
  HTTP_PROVIDERS,
  provide(BrowserXhr, {
    useClass: CustomBrowserXhr
  }),
  ROUTER_PROVIDERS,
  provide(TranslateLoader, {
    useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
    deps: [Http]
  }),
  TranslateService,
  UrlSafeBase64Service,
  LocalStorageService,
  UserService,
  AlertService,
  SignModalService,
  HttpUtilsService
])
.catch(err => console.error(err));
