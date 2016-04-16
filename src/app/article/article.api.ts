import {ApiPrefix} from '../base/api-prefix/api-prefix.service';

import {http} from '../base/injector/http-injector';

class Api {

  private prefix: string;

  private handleError(error: any) {
    return Promise.reject(error.message || error.json().msg || 'Server error');
  }

  getArticleCategories() {
    return http.get(this.prefix + '/article/categories/')
      .toPromise()
      .then((res) => {
        let body = res.json();
        return Promise.resolve(body);
      })
      .catch(this.handleError);
  }

  getArticleList(category: string) {
    return http.get(this.prefix + `/article/articles/${category}/`)
      .toPromise()
      .then((res) => {
        let body = res.json();
        return Promise.resolve(body);
      })
      .catch(this.handleError);
  }

  getArticleDetail(url: string) {
    return http.get(this.prefix + `/article/${url}/`)
      .toPromise()
      .then((res) => {
        let body = res.json();
        return Promise.resolve(body);
      })
      .catch(this.handleError);
  }

  constructor() {
    this.prefix = ApiPrefix.get('API_PREFIX');
  }

}

export var ArticleApi = new Api();
