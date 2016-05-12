import {ApiPrefix} from '../api-prefix/api-prefix.service';
import {http, dhttp} from '../injector/http-injector';

class Api {

  private prefix: string;

  overview() {
    return dhttp.get(this.prefix + '/initHomePage/');
  }

  constructor() {
    this.prefix = ApiPrefix.get('API_PREFIX');
  }

}

export var BaseApi = new Api();
