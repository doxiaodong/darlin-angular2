import {
  RequestHandler,
  ResponseHandler,
  ErrorHandler
} from '../http/http-interceptor/http-interceptor.provider'

const ResponseInterceptor = {
  request(url: string, request) {
    RequestHandler()
  },

  success(success) {
  },

  error(error) {
    ErrorHandler(error, true)
  },

  response(response) {
    ResponseHandler(response)
  }
}

const Interceptors = [
  ResponseInterceptor
]

export default Interceptors
