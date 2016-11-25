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
import { getAESToken } from 'app/base/utils/get-aes-token.service'

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
    request.headers.append('X-AESToken', getAESToken())
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
  const httpCode = error.status
  try {
    errorBody = error.json()
  } catch (error) {
    console.error('parse error body fail')
  }
  if (!isFetch) {
    // fetch res.json return Promise while angular Http res not
    errorBody = Promise.resolve(errorBody)
  }

  errorBody.then((value) => {
    ResponseHandler(value)
    const errorCode = value && value.code || httpCode
    GLOBAL_VALUE.TRANSLATE.get(`error.${errorCode}`).subscribe((v: string) => {
      AlertService.show(`[${errorCode}]${v}`)
    })
  })
}
