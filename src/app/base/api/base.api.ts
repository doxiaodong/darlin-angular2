import {ApiPrefix} from '../api-prefix/api-prefix.service';
import {http} from '../injector/http-injector';
import {ResponseHandler, ErrorHandler} from '../http-interceptor/http-interceptor.provider';

class Api {

  private prefix: string;

  overview() {
    return http.get(this.prefix + '/initHomePage/')
      .toPromise()
      .then((res) => {
        ResponseHandler(res);
        let body = res.json();
        if (body.status == 1) {
          return Promise.resolve(body.data);
        } else {
          return Promise.reject(res);
        }
      })
      .catch(ErrorHandler);
  }

  constructor() {
    this.prefix = ApiPrefix.get('API_PREFIX');
  }

}

export var BaseApi = new Api();
