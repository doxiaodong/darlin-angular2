import {ApiPrefix} from '../base/api-prefix/api-prefix.service';

import {http} from '../base/injector/http-injector';
import {ResponseHandler, ErrorHandler} from '../base/http-interceptor/http-interceptor.provider';

class Api {

  private prefix: string;

  getArticleCategories() {
    return http.get(this.prefix + '/article/categories/?format=json')
      .toPromise()
      .then((res) => {
        ResponseHandler(res);
        let body = res.json();
        return Promise.resolve(body);
      })
      .catch(ErrorHandler);
  }

  getArticleList(category: string) {
    return http.get(this.prefix + `/article/articles/${category}/?format=json`)
      .toPromise()
      .then((res) => {
        ResponseHandler(res);
        let body = res.json();
        return Promise.resolve(body);
      })
      .catch(ErrorHandler);
  }

  getArticleDetail(url: string) {
    return http.get(this.prefix + `/article/${url}/?format=json`)
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

export var ArticleApi = new Api();
