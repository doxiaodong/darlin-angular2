import {ApiPrefix} from '../api-prefix/api-prefix.service';
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

@Injectable()
export class BaseApi {

  private http: Http;
  private prefix: string;

  private handleError(error: any) {
    return Promise.reject(error.message || error.json().error || 'Server error');
  }

  overview() {
    return this.http.get(this.prefix + '/initHomePage/')
      .toPromise()
      .then((res) => {
        let body = res.json();
        if (body.status == 1) {
          return Promise.resolve(body.data);
        } else {
          return Promise.reject(body);
        }
      })
      .catch(this.handleError);
  }

  constructor(http: Http) {
    this.http = http;
    this.prefix = ApiPrefix.get('API_PREFIX');
  }

}