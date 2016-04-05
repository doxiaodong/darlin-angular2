import {ApiPrefix} from '../api-prefix/api-prefix.service';
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

import {HttpUtilsService} from '../utils/http-utils.service';

@Injectable()
export class CommentApi {

  private http: Http;
  private prefix: string;
  private httpUtils: HttpUtilsService;

  private handleError(error: any) {
    return Promise.reject(error.message || error.json().error || 'Server error');
  }

  getArticleListCommentList(article: string) {
    return this.http.get(this.prefix + `/comment/comments/${article}/`)
      .toPromise()
      .then((res) => {
        let body = res.json();
        return Promise.resolve(body);
      })
      .catch(this.handleError);
  }

  getArticleSubComments(head: string) {
    return this.http.get(this.prefix + `/comment/subcomments/${head}/`)
      .toPromise()
      .then((res) => {
        let body = res.json();
        return Promise.resolve(body);
      })
      .catch(this.handleError);
  }

  getAccountSubComments(user: string) {
    return this.http.get(this.prefix + `/account/subcomments/${user}/`)
      .toPromise()
      .then((res) => {
        let body = res.json();
        return Promise.resolve(body);
      })
      .catch(this.handleError);
  }

  getAllComments() {
    return this.http.get(this.prefix + '/comments/')
      .toPromise()
      .then((res) => {
        let body = res.json();
        return Promise.resolve(body);
      })
      .catch(this.handleError);
  }

  addArticleReply(article: string, obj: Object) {
    // obj = {content: <string>}
    return this.http.post(this.prefix + `/comments/add/${article}/`, this.httpUtils.paramPostBody(obj))
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

  addSubReply(comment: string, obj: Object) {
    // obj = {content: <string>, reply_object: <string>}
    return this.http.post(this.prefix + `/comments/add-sub/${comment}/`, this.httpUtils.paramPostBody(obj))
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

  constructor(http: Http, httpUtils: HttpUtilsService) {
    this.http = http;
    this.prefix = ApiPrefix.get('API_PREFIX');
    this.httpUtils = httpUtils;
  }

}