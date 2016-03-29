import {ApiPrefix} from '../api-prefix/api-prefix.service';
import {Injectable} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';

@Injectable()
export class BaseApi {

  private http: Http;
  private prefix: string;

  overview() {
    return this.http.get(this.prefix + '/initHomePage/');
  };

  constructor(http: Http) {
    this.http = http;
    this.prefix = ApiPrefix.get('API_PREFIX')
  }

}