import {ApiPrefix} from '../api-prefix/api-prefix.service';

import {http} from '../injector/http-injector';

class Api {

  private prefix: string;

  private handleError(error: any) {
    return Promise.reject(error.message || error.json().msg || 'Server error');
  }

  overview() {
    return http.get(this.prefix + '/initHomePage/')
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

  constructor() {
    this.prefix = ApiPrefix.get('API_PREFIX');
  }

}

export var BaseApi = new Api();
