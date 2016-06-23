import {ApiPrefix} from '../base/api-prefix/api-prefix.service';

import {
  Dhttp,
  Dhttp2
} from '../base/injector/http-injector';
import {
  ResponseHandler,
  ErrorHandler
} from '../base/http-interceptor/http-interceptor.provider';

class Api {

  private prefix: string;

  getLinks() {
    return Dhttp2.get(this.prefix + '/links/?format=json');
  }

  constructor() {
    this.prefix = ApiPrefix.get('API_PREFIX');
  }

}

export var LinksApi = new Api();
