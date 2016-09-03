import {
  ReflectiveInjector,
  ClassProvider
} from '@angular/core'
import {
  Http,
  XHRBackend,
  BrowserXhr,
  RequestOptions,
  BaseRequestOptions,
  ResponseOptions,
  BaseResponseOptions,
  XSRFStrategy,
  CookieXSRFStrategy
} from '@angular/http'
import { CustomBrowserXhr } from '../custom-browser-xhr/custom-browser-xhr.provide'
import {
  HttpInterceptor,
  ResponseHandler,
  ErrorHandler
} from '../http-interceptor/http-interceptor.provider'

function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
  return new Http(xhrBackend, requestOptions)
}

function createDefaultCookieXSRFStrategy() {
  return new CookieXSRFStrategy()
}

const BrowserXhrProvider: ClassProvider = {
  provide: BrowserXhr,
  useClass: CustomBrowserXhr
}
const XHRBackendProvider: ClassProvider = {
  provide: XHRBackend,
  useClass: HttpInterceptor
}
let injector = ReflectiveInjector.resolveAndCreate([
  { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions] },
  BrowserXhr,
  { provide: RequestOptions, useClass: BaseRequestOptions },
  { provide: ResponseOptions, useClass: BaseResponseOptions },
  XHRBackend,
  { provide: XSRFStrategy, useFactory: createDefaultCookieXSRFStrategy },
  BrowserXhrProvider,
  XHRBackendProvider
])
export const http = injector.get(Http)

export class Dhttp {

  static dhttpFn(name: string, ...args) {
    return http[name].apply(http, ...args)
      .toPromise()
      .then((res) => {
        ResponseHandler(res)
        let body = res.json()
        if (body.status === 1) {
          return Promise.resolve(body.data)
        } else {
          return Promise.reject(res)
        }
      })
      .catch(ErrorHandler)
  }

  static request(...args) {
    return this.dhttpFn('request', args)
  }

  static get(...args) {
    return this.dhttpFn('get', args)
  }

  static post(...args) {
    return this.dhttpFn('post', args)
  }

  static put(...args) {
    return this.dhttpFn('put', args)
  }

  static delete(...args) {
    return this.dhttpFn('delete', args)
  }

  static patch(...args) {
    return this.dhttpFn('patch', args)
  }

  static head(...args) {
    return this.dhttpFn('head', args)
  }

}

export class Dhttp2 extends Dhttp {

  static dhttpFn(name: string, ...args) {
    return http[name].apply(http, ...args)
      .toPromise()
      .then((res) => {
        ResponseHandler(res)
        let body = res.json()
        return Promise.resolve(body)
      })
      .catch(ErrorHandler)
  }

}

export class Dhttp3 extends Dhttp {

  static dhttpFn(name: string, ...args) {
    return http[name].apply(http, ...args)
      .toPromise()
      .then((res) => {
        ResponseHandler(res)
        let body = res.json()
        if (body.status === 1) {
          return Promise.resolve(body)
        } else {
          return Promise.reject(res)
        }
      })
      .catch(ErrorHandler)
  }

}
