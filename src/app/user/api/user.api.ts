import API_PREFIX from 'app/base/api-prefix/api-prefix.service'
import { HttpUtilsService } from 'app/base/utils/http-utils.service'
import { getCookie } from 'app/base/utils/get-cookie.service'
import { Dhttp } from 'app/base/http'
import { Observable } from 'rxjs/Observable'

import {
  ResponseHandler,
  ErrorHandler,
  RequestHandler
} from 'app/base/http/http-interceptor/http-interceptor.provider'

const md5 = require('crypto-js/md5')

class Api {

  signin(obj: any) {
    // {username: <string>, password: <string>}
    let _obj = {
      username: obj.username,
      password: md5(obj.password).toString()
    }
    return Dhttp.post(API_PREFIX + '/account/signin/', HttpUtilsService.paramPostBody(_obj), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  register(obj: any) {
    let _obj = {
      username: obj.username,
      password: md5(obj.password).toString(),
      nickname: obj.nickname,
      email: obj.email
    }
    // {username: <string>, password: <string>, nickname: <string>, email: <string>}
    return Dhttp.post(API_PREFIX + '/account/register/', HttpUtilsService.paramPostBody(_obj), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  githubLogin() {
    RequestHandler()
    window.location.href = API_PREFIX + '/third/github/'
  }

  qqLogin() {
    RequestHandler()
    window.location.href = API_PREFIX + '/third/qq/'
  }

  signout() {
    return Dhttp.post(API_PREFIX + '/account/signout/', '')
  }

  getUserInfo(obj: Object) {
    // {username: <string>}
    return Dhttp.post(API_PREFIX + '/account/getUserInfo/', HttpUtilsService.paramPostBody(obj), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  // use XMLHttpRequest
  changeProfile(formData: FormData) {
    if (fetch) {
      return changeProfileFetch(formData)
    } else {
      return changeProfileXHR(formData)
    }
  }

  changePassword(obj: any) {
    let _obj = {
      username: obj.username,
      old_password: md5(obj.oldPassword).toString(),
      new_password: md5(obj.newPassword).toString()
    }
    // {username: <string>, old_password: <string>, new_password: <string>}
    return Dhttp.post(API_PREFIX + '/account/change/', HttpUtilsService.paramPostBody(_obj), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  resetPassword(obj: any) {
    let _obj = {
      username: obj.username,
      new_password: md5(obj.newPassword).toString()
    }
    // {username: <string>, new_password: <string>}
    return Dhttp.post(API_PREFIX + '/account/reset/', HttpUtilsService.paramPostBody(_obj), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

}

export const UserApi = new Api()

// use XMLHttpRequest
function changeProfileXHR(formData: FormData) {
  // for csrf
  formData.append('csrfmiddlewaretoken', getCookie('csrftoken'))
  RequestHandler()
  return Observable.create((observer) => {
    let xhr = new XMLHttpRequest()
    xhr.withCredentials = true

    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          observer.next(JSON.parse(xhr.response))
          observer.complete()
        } else {
          observer.error(xhr.response)
        }
      }
    })

    xhr.open('POST', API_PREFIX + '/account/setting/')
    xhr.send(formData)
  })
    .toPromise()
    .then((res) => {
      ResponseHandler(res)
      return Promise.resolve(res)
    })
    .catch(ErrorHandler)
}

function changeProfileFetch(formData: FormData) {
  // for csrf
  formData.append('csrfmiddlewaretoken', getCookie('csrftoken'))
  return Dhttp.post(API_PREFIX + '/account/setting/', formData, {
    headers: {}
  })
}
