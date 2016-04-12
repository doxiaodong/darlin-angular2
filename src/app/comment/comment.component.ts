import {Component, OnInit} from 'angular2/core';
import {DatePipe, NgForm} from 'angular2/common';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {UrlSafeBase64Service} from '../base/base64/base64safe.service';
import {AlertService} from '../base/alert/alert.service';

import {CommentApi} from './comment.api';

import {MarkedComponent} from '../base/marked/marked.component';

@Component({
  selector: '[article-comments]',
  template: require('./comment.template.html'),
  providers: [CommentApi],
  pipes: [DatePipe, TranslatePipe],
  directives: [ROUTER_DIRECTIVES, MarkedComponent]
})

export class CommentComponent implements OnInit {

  public requesting: boolean = false;

  public comments;
  public articleReplies: number = 0;

  public article: string;

  public submitForm: Object;

  getReplies(head: string, comment) {
    this.commentApi.getArticleSubComments(head)
    .then(subData => {
      comment.replies = []
      subData.results.map(r => {
        let reply = {
          replyUser: {
            // pic: STATIC_URL_HOST + r.reply_user.pic + HEAD_PIC_STYLE,
            username: r.reply_user.username,
            nickname: r.reply_user.nickname
          },
          replyObject: {
            // pic: STATIC_URL_HOST + r.reply_object.pic+ HEAD_PIC_STYLE,
            username: r.reply_object.username,
            nickname: r.reply_object.nickname
          },
          content: r.content,
          time: new Date(r.reply_time)
        };

        comment.replies.push(reply);
        this.articleReplies += 1;
      });
    });
  }

  getComments(url: string) {
    this.commentApi.getArticleCommentList(url)
    .then(data => {

      this.comments = [];
      data.results.map(c => {
        let comment = {
          replyUser: {
            // pic: STATIC_URL_HOST + c.reply_user.pic + HEAD_PIC_STYLE,
            username: c.reply_user.username,
            nickname: c.reply_user.nickname
          },
          input: {
            show: false
          },
          replies: [],
          content: c.content,
          time: new Date(c.reply_time),
          index: c.index,
          url: c.url
        };
        this.comments.push(comment);
        this.articleReplies += 1;
        this.getReplies(c.url, comment);
      });

    });
  }

  showReplyInput(comment, reply) {
    comment.input.object = reply.replyUser.username;
    comment.input.nickname = reply.replyUser.nickname;
    this.comments.map(c => {
      c.input.show = false;
    });
    comment.input.show = true;
  }

  clearSubmitForm() {
    this.submitForm = {
      commentContent: '',
      replyContent: ''
    }
  }

  comment(article: string, obj: Object) {

    this.requesting = true;

    this.commentApi.addArticleReply(article, obj)
    .then(data => {
      this.clearSubmitForm();
      let n = this.comments.length;
      let comment = data.comment;
      comment.time = new Date(comment.time);
      if (this.comments[n-1]) {
        comment.index = this.comments[n-1].index + 1;
      } else {
        comment.index = 1;
      }
      comment.input = {show: false};
      // comment.replyUser.pic = STATIC_URL_HOST + comment.replyUser.pic + HEAD_PIC_STYLE;
      comment.replies = [];
      this.comments.push(comment);
      this.articleReplies += 1;

      this.requesting = false;
    }).catch((msg) => {
      this.requesting = false;
      this.alert.show(msg);
    });
  }

  reply(comment: string, obj: Object, index: number) {
    this.requesting = true;
    this.commentApi.addSubReply(comment, obj)
    .then(data => {
      this.clearSubmitForm();
      let sub = data.subComment;
      // sub.replyObject.pic = STATIC_URL_HOST + sub.replyObject.pic + HEAD_PIC_STYLE;
      // sub.replyUser.pic = STATIC_URL_HOST + sub.replyUser.pic + HEAD_PIC_STYLE;
      sub.time = new Date(sub.time);
      this.comments[index-1].replies.push(sub);
      this.articleReplies += 1;

      this.requesting = false;
    }).catch((msg) => {
      this.requesting = false;
      this.alert.show(msg);
    });
  }

  constructor(
    private routeParams: RouteParams,
    private commentApi: CommentApi,
    private b64: UrlSafeBase64Service,
    private alert: AlertService
  ) {
  }

  ngOnInit() {
    let url = this.b64.decode(this.routeParams.get('url'));

    this.getComments(url);
    this.article = url;

    this.submitForm = {
      commentContent: '',
      replyContent: ''
    };
  }

}
