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
      errorBody = error.json()
    } catch (error) {
      console.error('parse error body fail')
    }
  }

  ResponseHandler(errorBody)
  if (errorBody) {
    GLOBAL_VALUE.TRANSLATE.get(`error.${errorBody.code}`).subscribe((value: string) => {
      AlertService.show(value)
    })
  }
}
