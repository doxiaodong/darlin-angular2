import {ReflectiveInjector, provide} from '@angular/core';
import {HTTP_PROVIDERS, Http, XHRBackend, BrowserXhr} from '@angular/http';
import {CustomBrowserXhr} from '../custom-browser-xhr/custom-browser-xhr.provide';
import {HttpInterceptor, ResponseHandler, ErrorHandler} from '../http-interceptor/http-interceptor.provider';


var injector = ReflectiveInjector.resolveAndCreate([
  HTTP_PROVIDERS,
  provide(BrowserXhr, {
    useClass: CustomBrowserXhr
  }),
  provide(XHRBackend, {
    useClass: HttpInterceptor
  })
]);
export var http = injector.get(Http);

export class dhttp {

  static dhttpFn(name: string, ...args) {
    return http[name].apply(http, ...args)
    .toPromise()
    .then((res) => {
      ResponseHandler(res);
      let body = res.json();
      if (body.status == 1) {
        return Promise.resolve(body.data);
      } else {
        return Promise.reject(res);
      }
    })
    .catch(ErrorHandler);
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

export class dhttp2 extends dhttp {

  static dhttpFn(name: string, ...args) {
    return http[name].apply(http, ...args)
    .toPromise()
    .then((res) => {
      ResponseHandler(res);
      let body = res.json();
      return Promise.resolve(body);
    })
    .catch(ErrorHandler);
  }

}

export class dhttp3 extends dhttp {

  static dhttpFn(name: string, ...args) {
    return http[name].apply(http, ...args)
    .toPromise()
    .then((res) => {
      ResponseHandler(res);
      let body = res.json();
      if (body.status == 1) {
        return Promise.resolve(body);
      } else {
        return Promise.reject(res);
      }
    })
    .catch(ErrorHandler);
  }

}
