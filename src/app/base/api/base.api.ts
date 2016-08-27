import {ApiPrefix} from '../api-prefix/api-prefix.service';
import {
  Dhttp
} from '../injector/http-injector';

class Api {

  private prefix: string;

  overview() {
    return Dhttp.get(this.prefix + '/initHomePage/');
  }

  constructor() {
    this.prefix = ApiPrefix.get('API_PREFIX');
  }

}

export const BaseApi = new Api();
