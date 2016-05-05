import {ReflectiveInjector, provide} from '@angular/core';
import {HTTP_PROVIDERS, Http, XHRBackend, RequestOptions, BrowserXhr} from '@angular/http';
import {CustomBrowserXhr} from '../custom-browser-xhr/custom-browser-xhr.provide';
import {HttpInterceptor} from '../http-interceptor/http-interceptor.provider';


var injector = ReflectiveInjector.resolveAndCreate([
  HTTP_PROVIDERS,
  provide(BrowserXhr, {
    useClass: CustomBrowserXhr
  }),
  provide(XHRBackend, {
    useClass: HttpInterceptor
  }),
  provide(Http, {
    useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => {
      return new Http(backend, defaultOptions);
    },
    deps: [XHRBackend, RequestOptions]
  })
]);
export var http = injector.get(Http);
