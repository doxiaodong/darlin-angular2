import Interceptors from './interceptor'
import { getCookie } from '../utils/get-cookie.service'
import { getAESToken } from '../utils/get-aes-token.service'
export * from './jsonp'

const httpInterceptor = {
  request: [],
  success: [],
  error: [],
  response: []
}

Interceptors.forEach((interceptor) => {
  if (interceptor.request) {
    httpInterceptor.request.push(interceptor.request)
  }
  if (interceptor.success) {
    httpInterceptor.success.push(interceptor.success)
  }
  if (interceptor.error) {
    httpInterceptor.error.push(interceptor.error)
  }
  if (interceptor.response) {
    httpInterceptor.response.push(interceptor.response)
  }
})

interface IHttpConfig {
  mode?: 'same-origin' | 'no-cors' | 'cors'
  cache?: 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached'
  credentials?: 'omit' | 'same-origin' | 'include'
  redirect?: 'follow' | 'error' | 'manual'
  headers?: HeadersInit
}

export class Http {

  static httpFnRequest(name: string, ...args) {
    let url = args[0]
    let body = args[1]
    let config = args[2] || {}

    let fetchOptions: RequestInit = {
      method: name.toUpperCase(),
      mode: 'cors',
      cache: 'default',
      credentials: 'include',
      headers: {}
    }

    if (
      !config.headers &&
      (fetchOptions.method === 'POST' ||
        fetchOptions.method === 'DELETE' ||
        fetchOptions.method === 'PUT')
    ) {
      fetchOptions.headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    if (config.headers) {
      fetchOptions.headers = config.headers
    }

    fetchOptions.headers['X-CSRFToken'] = getCookie('csrftoken')
    fetchOptions.headers['X-AESToken'] = getAESToken()

    if (body) {
      fetchOptions.body = body
    }

    if (config.redirect) {
      fetchOptions.redirect = config.redirect
    }

    // fetch start
    httpInterceptor.request.forEach((requestFn) => {
      requestFn(url, fetchOptions)
    })

    let retFetch = fetch(url, fetchOptions)
      .then((response: Response) => {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject(response)
        }
      })

    retFetch.then((response) => {
      httpInterceptor.success.forEach((successFn) => {
        successFn(response)
      })
      httpInterceptor.response.forEach((responseFn) => {
        responseFn(response)
      })
    }).catch((error) => {
      httpInterceptor.error.forEach((errorFn) => {
        errorFn(error)
      })
      httpInterceptor.response.forEach((responseFn) => {
        responseFn(error)
      })
    })

    return retFetch
  }

  static httpFn(name, ...args) {
    return this.httpFnRequest(name, ...args)
      .then((response) => {
        return response
      }, (error) => {
        return Promise.reject(error)
      })
  }

  static get(url, config?: IHttpConfig) {
    return this.httpFn('get', url, null, config)
  }

  static post(url, body?, config?: IHttpConfig) {
    return this.httpFn('post', url, body, config)
  }

  static put(url, body?, config?: IHttpConfig) {
    return this.httpFn('put', url, body, config)
  }

  static delete(url, config?: IHttpConfig) {
    return this.httpFn('delete', url, null, config)
  }

  static patch(url, body?, config?: IHttpConfig) {
    return this.httpFn('patch', url, body, config)
  }

  static head(url, config?: IHttpConfig) {
    return this.httpFn('head', url, null, config)
  }

}

export class DhttpFetch extends Http {
  static httpFn(name, ...args) {
    return this.httpFnRequest(name, ...args)
      .then((response) => {
        return response
      }, (error) => {
        return Promise.reject(error)
      })
  }
}
