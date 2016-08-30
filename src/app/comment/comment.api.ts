import { ApiPrefix } from '../base/api-prefix/api-prefix.service'
import { Headers } from '@angular/http'

import {
  Dhttp,
  Dhttp2
} from '../base/injector/http-injector'
import { HttpUtilsService } from '../base/utils/http-utils.service'

class Api {

  private prefix: string

  getArticleCommentList(article: string) {
    return Dhttp2.get(this.prefix + `/comment/comments/${article}/?format=json`)
  }

  getArticleSubComments(head: string) {
    return Dhttp2.get(this.prefix + `/comment/subcomments/${head}/?format=json`)
  }

  getAccountSubComments(user: string) {
    return Dhttp2.get(this.prefix + `/account/subcomments/${user}/?format=json`)
  }

  getAllComments() {
    return Dhttp2.get(this.prefix + '/comments/?format=json')
  }

  addArticleReply(article: string, obj: Object) {
    // obj = {content: <string>}
    return Dhttp.post(
      this.prefix + `/comments/add/${article}/`, HttpUtilsService.paramPostBody(obj), {
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      })
  }

  addSubReply(comment: string, obj: Object) {
    // obj = {content: <string>, reply_object: <string>}
    return Dhttp.post(
      this.prefix + `/comments/add-sub/${comment}/`, HttpUtilsService.paramPostBody(obj), {
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      })
  }

  constructor() {
    this.prefix = ApiPrefix.get('API_PREFIX')
  }

}

export const CommentApi = new Api()
