import {ApiPrefix} from '../base/api-prefix/api-prefix.service';

import {Dhttp2} from '../base/injector/http-injector';

class Api {

  private prefix: string;

  getArticleCategories() {
    return Dhttp2.get(this.prefix + '/article/categories/?format=json');
  }

  getArticleList(category: string, page: number = 1) {
    return Dhttp2.get(this.prefix + `/article/articles/${category}/?format=json&page=${page}`);
  }

  getArticleDetail(url: string) {
    return Dhttp2.get(this.prefix + `/article/${url}/?format=json`);
  }

  constructor() {
    this.prefix = ApiPrefix.get('API_PREFIX');
  }

}

export const ArticleApi = new Api();
