import { Headers } from '@angular/http'
import API_PREFIX from 'app/base/api-prefix/api-prefix.service'

import { Dhttp } from 'app/base/http'
import { HttpUtilsService } from 'app/base/utils/http-utils.service'

class Api {

  getArticleCommentList(article: string) {
    return Dhttp.get(API_PREFIX + `/comment/comments/${article}/?format=json`)
  }

  getArticleSubComments(head: string) {
    return Dhttp.get(API_PREFIX + `/comment/subcomments/${head}/?format=json`)
  }

  getAccountSubComments(user: string) {
    return Dhttp.get(API_PREFIX + `/account/subcomments/${user}/?format=json`)
  }

  getAllComments() {
    return Dhttp.get(API_PREFIX + '/comments/?format=json')
  }

  addArticleReply(article: string, obj: Object) {
    // obj = {content: <string>}
    return Dhttp.post(
      API_PREFIX + `/comments/add/${article}/`, HttpUtilsService.paramPostBody(obj), {
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      })
  }

  addSubReply(comment: string, obj: Object) {
    // obj = {content: <string>, reply_object: <string>}
    return Dhttp.post(
      API_PREFIX + `/comments/add-sub/${comment}/`, HttpUtilsService.paramPostBody(obj), {
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      })
  }

}

export const CommentApi = new Api()
