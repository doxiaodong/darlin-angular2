import {Component, OnInit} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

import {TranslatePipe} from 'ng2-translate/ng2-translate';
import b64 from '../base/base64/base64safe.service';
import {AlertService} from '../base/alert/alert.service';

import {CommentApi} from './comment.api';

import {MarkedComponent} from '../base/marked/marked.component';
import {XdDatePipe} from '../base/xd-date/xd-date.pipe';

@Component({
  selector: '[article-comments]',
  template: require('./comment.template.html'),
  pipes: [XdDatePipe, TranslatePipe],
  directives: [ROUTER_DIRECTIVES, MarkedComponent]
})

export class CommentComponent implements OnInit {

  public requesting: boolean = false;

  public comments;
  public articleReplies: number = 0;

  public article: string;

  public submitForm: Object;

  getReplies(head: string, comment) {
    CommentApi.getArticleSubComments(head)
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
          time: r.reply_time
        };

        comment.replies.push(reply);
        this.articleReplies += 1;
      });
    });
  }

  getComments(url: string) {
    CommentApi.getArticleCommentList(url)
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
          time: c.reply_time,
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

    CommentApi.addArticleReply(article, obj)
    .then(data => {
      this.clearSubmitForm();
      let n = this.comments.length;
      let comment = data.comment;
      comment.time = comment.time;
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
      AlertService.show(msg);
    });
  }

  reply(comment: string, obj: Object, index: number) {
    this.requesting = true;
    CommentApi.addSubReply(comment, obj)
    .then(data => {
      this.clearSubmitForm();
      let sub = data.subComment;
      // sub.replyObject.pic = STATIC_URL_HOST + sub.replyObject.pic + HEAD_PIC_STYLE;
      // sub.replyUser.pic = STATIC_URL_HOST + sub.replyUser.pic + HEAD_PIC_STYLE;
      sub.time = sub.time;
      this.comments[index-1].replies.push(sub);
      this.articleReplies += 1;

      this.requesting = false;
    }).catch((msg) => {
      this.requesting = false;
      AlertService.show(msg);
    });
  }

  constructor(
    private routeParams: RouteParams
  ) {
  }

  ngOnInit() {
    let url = b64.decode(this.routeParams.get('url'));

    this.getComments(url);
    this.article = url;

    this.submitForm = {
      commentContent: '',
      replyContent: ''
    };
  }

}
