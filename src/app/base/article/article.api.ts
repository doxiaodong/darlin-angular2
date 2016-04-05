import {ApiPrefix} from '../api-prefix/api-prefix.service';
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

@Injectable()
export class ArticleApi {

  private http: Http;
  private prefix: string;

  private handleError(error: any) {
    return Promise.reject(error.message || error.json().error || 'Server error');
  }

  getArticleCategories() {
    return this.http.get(this.prefix + '/article/categories/')
      .toPromise()
      .then((res) => {
        let body = res.json();
        return Promise.resolve(body);
      })
      .catch(this.handleError);
  }

  getArticleList(category: string) {
    return this.http.get(this.prefix + `/article/articles/${category}/`)
      .toPromise()
      .then((res) => {
        let body = res.json();
        return Promise.resolve(body);
      })
      .catch(this.handleError);
  }

  getArticleDetail(url: string) {
    return this.http.get(this.prefix + `/article/${url}/`)
      .toPromise()
      .then((res) => {
        let body = res.json();
        return Promise.resolve(body);
      })
      .catch(this.handleError);
  }

  constructor(http: Http) {
    this.http = http;
    this.prefix = ApiPrefix.get('API_PREFIX');
  }

}