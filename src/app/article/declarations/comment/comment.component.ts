import {
  Component,
  OnInit,
  ViewEncapsulation,
  OnDestroy
} from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import {
  TranslateService,
  LangChangeEvent
} from 'ng2-translate'
import { CommentApi } from './comment.api'
import { PicUrl } from 'app/base/pic-url/pic-url.service'
import { Reply } from 'app/share/icon'
import {
  IRequestParams,
  requesting
} from 'app/base/requesting'

const request: IRequestParams = {
  requesting: false
}

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'comp-article-comments',
  templateUrl: './comment.template.html',
  styles: [
    `
      .reply-floor .CodeMirror, .reply-floor .CodeMirror-scroll {
        min-height: 100px;
      }
    `
  ]
})

export class CommentComponent implements OnInit, OnDestroy {

  commentMDEOption = {}
  subCommentMDEOption = {
    toolbar: false
  }

  private sub: any
  public icon = {
    reply: Reply
  }
  public lang: string

  get requesting() {
    return request.requesting
  }

  public comments
  public articleReplies: number = 0

  public article: string

  public submitForm: any

  getReplies(head: string, comment) {
    CommentApi.getArticleSubComments(head)
      .then(subData => {
        comment.replies = []
        subData.results.map(r => {
          let reply = {
            replyUser: {
              pic: PicUrl.getUrl(r.reply_user.pic, r.reply_user.email),
              username: r.reply_user.username,
              nickname: r.reply_user.nickname
            },
            replyObject: {
              pic: PicUrl.getUrl(r.reply_object.pic, r.reply_object.email),
              username: r.reply_object.username,
              nickname: r.reply_object.nickname
            },
            content: r.content,
            time: r.reply_time
          }

          comment.replies.push(reply)
          this.articleReplies += 1
        })
      })
  }

  getComments(url: string) {
    CommentApi.getArticleCommentList(url)
      .then(data => {

        this.comments = []
        data.results.map(c => {
          let comment = {
            replyUser: {
              pic: PicUrl.getUrl(c.reply_user.pic, c.reply_user.email),
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
          }
          this.comments.push(comment)
          this.articleReplies += 1
          this.getReplies(c.url, comment)
        })

      })
  }

  showReplyInput(comment, reply) {
    comment.input.object = reply.replyUser.username
    comment.input.nickname = reply.replyUser.nickname
    this.comments.map(c => {
      c.input.show = false
    })
    comment.input.show = true
  }

  clearSubmitForm() {
    this.submitForm = {
      commentContent: '',
      replyContent: ''
    }
  }

  @requesting(request)
  comment(article: string, obj: Object) {
    return CommentApi.addArticleReply(article, obj)
      .then(data => {
        this.clearSubmitForm()
        let n = this.comments.length
        let comment = data.comment
        comment.time = comment.time
        if (this.comments[n - 1]) {
          comment.index = this.comments[n - 1].index + 1
        } else {
          comment.index = 1
        }
        comment.input = { show: false }
        comment.replyUser.pic = PicUrl.getUrl(comment.replyUser.pic, comment.replyUser.email)
        comment.replies = []
        this.comments.push(comment)
        this.articleReplies += 1
      })
  }

  @requesting(request)
  reply(comment: string, obj: Object, index: number) {
    return CommentApi.addSubReply(comment, obj)
      .then(data => {
        this.clearSubmitForm()
        let sub = data.subComment
        sub.replyObject.pic = PicUrl.getUrl(sub.replyObject.pic, sub.replyObject.email)
        sub.replyUser.pic = PicUrl.getUrl(sub.replyUser.pic, sub.replyUser.email)
        sub.time = sub.time
        this.comments[index - 1].replies.push(sub)
        this.articleReplies += 1
      })
  }

  constructor(
    private route: ActivatedRoute,
    private ts: TranslateService
  ) { }

  ngOnInit() {
    this.ts.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang
    })

    this.sub = this.route.params
      .subscribe(params => {
        if (params) {
          let url = base64.Base64.decode(params['url'])

          this.getComments(url)
          this.article = url
        }
      })

    this.submitForm = {
      commentContent: '',
      replyContent: ''
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

}
