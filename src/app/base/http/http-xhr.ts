import {
  ReflectiveInjector,
  ClassProvider
} from '@angular/core'
import {
  Http,
  Headers,
  XHRBackend,
  BrowserXhr,
  RequestOptions,
  BaseRequestOptions,
  ResponseOptions,
  BaseResponseOptions,
  XSRFStrategy,
  CookieXSRFStrategy
} from '@angular/http'
import { CustomBrowserXhr } from './custom-browser-xhr/custom-browser-xhr.provide'
import {
  HttpInterceptor,
  ResponseHandler,
  ErrorHandler
} from './http-interceptor/http-interceptor.provider'

function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
  return new Http(xhrBackend, requestOptions)
}

function createDefaultCookieXSRFStrategy() {
  return new CookieXSRFStrategy('csrftoken', 'X-CSRFToken')
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
  { provide: RequestOptions, useClass: BaseRequestOptions },
  { provide: ResponseOptions, useClass: BaseResponseOptions },
  { provide: XSRFStrategy, useFactory: createDefaultCookieXSRFStrategy },
  BrowserXhrProvider,
  XHRBackendProvider
])
export const http = injector.get(Http)

function getJsonRes(res): any {
  let ret = {}
  try {
    ret = res.json()
  } catch (error) {
    console.error('json parse error', error)
  }
  return ret
}

function httpFn(name: string, ...args) {
  return http[name].apply(http, ...args)
    .toPromise()
    .then((res) => {
      ResponseHandler(res)
      let body = getJsonRes(res)
      return Promise.resolve(body)
    })
    .catch(ErrorHandler)
}

export class DhttpXHR {
  static request(...args) {
    return httpFn('request', args)
  }

  static get(...args) {
    return httpFn('get', args)
  }

  static post(...args) {
    const config = args[2]
    if (config && config.headers) {
      config.headers = new Headers(config.headers)
    }
    return httpFn('post', args)
  }

  static put(...args) {
    return httpFn('put', args)
  }

  static delete(...args) {
    return httpFn('delete', args)
  }

  static patch(...args) {
    return httpFn('patch', args)
  }

  static head(...args) {
    return httpFn('head', args)
  }
}
