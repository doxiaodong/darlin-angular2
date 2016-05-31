import {ApiPrefix} from '../api-prefix/api-prefix.service';
import {Headers} from '@angular/http';
import * as md5 from 'js-md5';
import {HttpUtilsService} from '../utils/http-utils.service';
import {http, dhttp, dhttp2, dhttp3} from '../injector/http-injector';
import {Observable} from 'rxjs';

import {ResponseHandler, ErrorHandler, RequestHandler} from '../http-interceptor/http-interceptor.provider';

class Api {

  private prefix: string;

  signin(obj: any) {
    // {username: <string>, password: <string>}
    let _obj = {
      username: obj.username,
      password: md5(obj.password)
    };
    return dhttp.post(this.prefix + '/account/signin/', HttpUtilsService.paramPostBody(_obj), {
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
  }

  register(obj: any) {
    let _obj = {
      username: obj.username,
      password: md5(obj.password),
      nickname: obj.nickname,
      email: obj.email
    };
    // {username: <string>, password: <string>, nickname: <string>, email: <string>}
    return dhttp.post(this.prefix + '/account/register/', HttpUtilsService.paramPostBody(_obj), {
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
  }

  githubLogin() {
    RequestHandler();
    window.location.href = this.prefix + '/third/github/';
  }

  qqLogin() {
    RequestHandler();
    window.location.href = this.prefix + '/third/qq/';
  }

  signout() {
    return dhttp.post(this.prefix + '/account/signout/', '');
  }

  getUserInfo(obj: Object) {
    // {username: <string>}
    return dhttp.post(this.prefix + '/account/getUserInfo/', HttpUtilsService.paramPostBody(obj), {
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
  }

  // use XMLHttpRequest
  changeProfile(obj: Object) {
    RequestHandler()
    return Observable.create((observer) => {
      let xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(JSON.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      });

      xhr.open('POST', this.prefix + '/account/setting/');

      xhr.send(obj);
    })
    .toPromise()
    .then((res) => {
      ResponseHandler(res);
      let data = res;
      if (data.status == 1) {
        return Promise.resolve(data);
      } else {
        return Promise.reject(data);
      }
    })
    .catch(ErrorHandler);

  }

  changePassword(obj: any) {

    let _obj = {
      username: obj.username,
      old_password: md5(obj.oldPassword),
      new_password: md5(obj.newPassword)
    };
    // {username: <string>, old_password: <string>, new_password: <string>}
    return dhttp3.post(this.prefix + '/account/change/', HttpUtilsService.paramPostBody(_obj), {
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
  }

  resetPassword(obj: any) {
    let _obj = {
      username: obj.username,
      new_password: md5(obj.newPassword)
    };
    // {username: <string>, new_password: <string>}
    return dhttp3.post(this.prefix + '/account/reset/', HttpUtilsService.paramPostBody(_obj), {
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
  }

  constructor() {
    this.prefix = ApiPrefix.get('API_PREFIX');
  }

}

export var AccountApi = new Api();
