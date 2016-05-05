import {ApiPrefix} from '../base/api-prefix/api-prefix.service';
import {Headers} from '@angular/http';

import {http} from '../base/injector/http-injector';
import {HttpUtilsService} from '../base/utils/http-utils.service';
import {ResponseHandler, ErrorHandler} from '../base/http-interceptor/http-interceptor.provider';

class Api {

  private prefix: string;

  getArticleCommentList(article: string) {
    return http.get(this.prefix + `/comment/comments/${article}/?format=json`)
      .toPromise()
      .then((res) => {
        ResponseHandler(res);
        let body = res.json();
        return Promise.resolve(body);
      })
      .catch(ErrorHandler);
  }

  getArticleSubComments(head: string) {
    return http.get(this.prefix + `/comment/subcomments/${head}/?format=json`)
      .toPromise()
      .then((res) => {
        ResponseHandler(res);
        let body = res.json();
        return Promise.resolve(body);
      })
      .catch(ErrorHandler);
  }

  getAccountSubComments(user: string) {
    return http.get(this.prefix + `/account/subcomments/${user}/?format=json`)
      .toPromise()
      .then((res) => {
        ResponseHandler(res);
        let body = res.json();
        return Promise.resolve(body);
      })
      .catch(ErrorHandler);
  }

  getAllComments() {
    return http.get(this.prefix + '/comments/?format=json')
      .toPromise()
      .then((res) => {
        ResponseHandler(res);
        let body = res.json();
        return Promise.resolve(body);
      })
      .catch(ErrorHandler);
  }

  addArticleReply(article: string, obj: Object) {
    // obj = {content: <string>}
    return http.post(
      this.prefix + `/comments/add/${article}/`, HttpUtilsService.paramPostBody(obj), {
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      })
      .toPromise()
      .then((res) => {
        ResponseHandler(res);
        let body = res.json();
        if (body.status == 1) {
          // TODO: ugly
          body.data.comment.replyUser.nickname = body.data.comment.replyUser.nickName;
          return Promise.resolve(body.data);
        } else {
          return Promise.reject(res);
        }
      })
      .catch(ErrorHandler);
  }

  addSubReply(comment: string, obj: Object) {
    // obj = {content: <string>, reply_object: <string>}
    return http.post(
      this.prefix + `/comments/add-sub/${comment}/`, HttpUtilsService.paramPostBody(obj), {
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      })
      .toPromise()
      .then((res) => {
        ResponseHandler(res);
        let body = res.json();
        if (body.status == 1) {
          // TODO: ugly
          body.data.subComment.replyObject.nickname = body.data.subComment.replyObject.nickName;
          body.data.subComment.replyUser.nickname = body.data.subComment.replyUser.nickName;
          return Promise.resolve(body.data);
        } else {
          return Promise.reject(res);
        }
      })
      .catch(ErrorHandler);
  }

  constructor() {
    this.prefix = ApiPrefix.get('API_PREFIX');
  }

}

export var CommentApi = new Api();
