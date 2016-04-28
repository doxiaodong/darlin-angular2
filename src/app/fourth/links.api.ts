import {ApiPrefix} from '../base/api-prefix/api-prefix.service';

import {http} from '../base/injector/http-injector';
import {ResponseHandler, ErrorHandler} from '../base/http-interceptor/http-interceptor.provider';

class Api {

  private prefix: string;

  getLinks() {
    return http.get(this.prefix + '/links/?format=json')
      .toPromise()
      .then((res) => {
        ResponseHandler(res);
        let body = res.json();
        return Promise.resolve(body);
      })
      .catch(ErrorHandler);
  }

  constructor() {
    this.prefix = ApiPrefix.get('API_PREFIX');
  }

}

export var LinksApi = new Api();
