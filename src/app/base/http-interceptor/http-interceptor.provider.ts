import {
  Request,
  XHRBackend,
  BrowserXhr,
  ResponseOptions,
  XHRConnection,
  Response,
  XSRFStrategy
} from '@angular/http'
import { Injectable } from '@angular/core'
import { LoadingService } from '../loading/loading.service'
import { AlertService } from '../alert/alert.service'
// import {
//   TranslatePipe,
//   TranslateService
// } from 'ng2-translate/ng2-translate'
import { LocalStorageService } from '../local-storage/local-storage.service'

@Injectable()
export class HttpInterceptor extends XHRBackend {

  constructor(
    _browserXHR: BrowserXhr,
    _baseResponseOptions: ResponseOptions,
    _xsrfStrategy: XSRFStrategy
  ) {
    super(_browserXHR, _baseResponseOptions, _xsrfStrategy)
  }

  createConnection(request: Request): XHRConnection {

    RequestHandler()

    let connection = super.createConnection(request)

    // connection.request.headers.set('Cache-Control', 'public, max-age=31536000')

    // this will call api twice
    // connection.response.toPromise()
    // .then((res) => {
    //   console.log(res, connection.request)
    // })

    // connection.response.subscribe((res) => {
    //   console.log(res, connection.request)
    // })

    return connection

  }

}

// TODO: add response interceptor

// need api call ResponseHandler and ErrorHandler

export function ResponseHandler(response: Response | any) {
  // console.log('http response')
  LoadingService.hide()
}

export function RequestHandler(): void {
  // console.log('http start')
  LoadingService.show()
}

export function ErrorHandler(error: any) {
  ResponseHandler(error)
  // TODO: try to use translate to solve this
  let lang: string = LocalStorageService.get('lang')
  let serverError: string = ''
  switch (lang) {
    case 'en_US':
      serverError = 'Server error'
      break
    case 'zh_CN':
      serverError = '服务器错误'
      break
    default:
      serverError = 'Server error'
  }

  AlertService.show(serverError)
  return Promise.reject(error.msg || error.json().msg || serverError)
}
