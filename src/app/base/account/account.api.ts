import {ApiPrefix} from '../api-prefix/api-prefix.service';
import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import * as md5 from 'js-md5';

import {HttpUtilsService} from '../utils/http-utils.service';
import {LocalStorageService} from '../local-storage/local-storage.service';

@Injectable()
export class AccountApi {

  private prefix: string;

  private handleError(error: any) {
    return Promise.reject(error.message || error.json().msg || 'Server error');
  }

  signin(obj: any) {
    // {username: <string>, password: <string>}
    let _obj = {
      username: obj.username,
      password: md5(obj.password)
    };
    return this.http.post(this.prefix + '/account/signin/', this.httpUtils.paramPostBody(_obj), {
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      })
      .toPromise()
      .then((res) => {
        let body = res.json();
        if (body.status == 1) {
          return Promise.resolve(body.data);
        } else {
          return Promise.reject(res);
        }
      })
      .catch(this.handleError);
  }

  register(obj: any) {
    let _obj = {
      username: obj.username,
      password: md5(obj.password),
      nickname: obj.nickname,
      email: obj.email
    };
    // {username: <string>, password: <string>, nickname: <string>, email: <string>}
    return this.http.post(this.prefix + '/account/register/', this.httpUtils.paramPostBody(_obj), {
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      })
      .toPromise()
      .then((res) => {
        let body = res.json();
        if (body.status == 1) {
          return Promise.resolve(body.data);
        } else {
          return Promise.reject(res);
        }
      })
      .catch(this.handleError);
  }

  signout() {
    return this.http.post(this.prefix + '/account/signout/', '')
      .toPromise()
      .then((res) => {
        let body = res.json();
        if (body.status == 1) {
          return Promise.resolve(body.data);
        } else {
          return Promise.reject(res);
        }
      })
      .catch(this.handleError);
  }

  getUserInfo(obj: Object) {
    // {username: <string>}
    return this.http.post(this.prefix + '/account/getUserInfo/', this.httpUtils.paramPostBody(obj), {
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      })
      .toPromise()
      .then((res) => {
        let body = res.json();
        if (body.status == 1) {
          return Promise.resolve(body.data);
        } else {
          return Promise.reject(res);
        }
      })
      .catch(this.handleError);
  }

  changeProfile(obj: Object) {
    // {username: <string>}
    return this.http.post(
      this.prefix + '/account/setting/', JSON.stringify(obj), {
        headers: new Headers({
        'Content-Type': undefined
        })
      })
      .toPromise()
      .then((res) => {
        let body = res.json();
        if (body.status == 1) {
          return Promise.resolve(body.data);
        } else {
          return Promise.reject(res);
        }
      })
      .catch(this.handleError);
  }

  changePassword(obj: Object) {
    // TODO: password add md5
    // {username: <string>, old_password: <string>, new_password: <string>}
    return this.http.post(this.prefix + '/account/change/', this.httpUtils.paramPostBody(obj), {
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      })
      .toPromise()
      .then((res) => {
        let body = res.json();
        if (body.status == 1) {
          return Promise.resolve(body.data);
        } else {
          return Promise.reject(res);
        }
      })
      .catch(this.handleError);
  }

  resetPassword(obj: Object) {
    // TODO: password add md5
    // {username: <string>, new_password: <string>}
    return this.http.post(this.prefix + '/account/reset/', this.httpUtils.paramPostBody(obj), {
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      })
      .toPromise()
      .then((res) => {
        let body = res.json();
        if (body.status == 1) {
          return Promise.resolve(body.data);
        } else {
          return Promise.reject(res);
        }
      })
      .catch(this.handleError);
  }

  constructor(
    private http: Http,
    private httpUtils: HttpUtilsService,
    private local: LocalStorageService
  ) {
    this.prefix = ApiPrefix.get('API_PREFIX');
  }

}
