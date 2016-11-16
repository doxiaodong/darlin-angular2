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
import { LoadingService } from 'app/declarations/loading/loading.service'
import { AlertService } from 'app/declarations/alert/alert.service'
// import {
//   TranslatePipe,
//   TranslateService
// } from 'ng2-translate/ng2-translate'
import { LocalStorageService } from 'app/base/local-storage/local-storage.service'
import { errorCodeMessages } from '../error/message'

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

export function ErrorHandler(error: any, isFetch = false) {
  let errorBody = null

  if (isFetch) {
    errorBody = error
  } else {
    try {
      errorBody = JSON.parse(error._body)
    } catch (error) {
      console.error('parse error body fail')
    }
  }

  ResponseHandler(errorBody)
  // TODO: try to use translate to solve this
  let lang: string = LocalStorageService.get('lang')
  if (errorBody) {
    const errorContent = errorCodeMessages[errorBody.code][lang]
    AlertService.show(errorContent)
  }
}
