import API_PREFIX from 'app/base/api-prefix/api-prefix.service'
import { Dhttp } from 'app/base/http'

class Api {

  getArticleCategories() {
    return Dhttp.get(API_PREFIX + '/article/categories/?format=json')
  }

  getArticleList(category: string, page: number = 1) {
    return Dhttp.get(API_PREFIX + `/article/articles/${category}/?format=json&page=${page}`)
  }

  getArticleDetail(url: string) {
    return Dhttp.get(API_PREFIX + `/article/${url}/?format=json`)
  }

}

export const ArticleApi = new Api()
