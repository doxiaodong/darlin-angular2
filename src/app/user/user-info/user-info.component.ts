import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core'
import {
  Router,
  ActivatedRoute
} from '@angular/router'
import {
  TranslateService,
  LangChangeEvent
} from 'ng2-translate'
import { UserService } from '../service/user.service'
import { PageAnimateFn } from 'app/share/declarations/page-animate/page-animate'

import { UserApi } from '../api/user.api'
import { CommentApi } from 'app/article/declarations/comment/comment.api'
import { PicUrl } from 'app/base/pic-url/pic-url.service'

@Component({
  selector: 'comp-user-info',
  templateUrl: './user-info.template.html',
  animations: [
    PageAnimateFn()
  ]
})

export class UserInfoComponent implements OnInit, OnDestroy {

  private sub: any

  public lang: string
  public encode: Function = base64.Base64.encodeURI
  public itsMe: boolean = false
  public replies: any[] = []
  public repliesOfArticle: any[] = []
  public replyContainerFold: boolean = false
  public commentContainerFold: boolean = false
  public supperUser: boolean = false
  public profile: any
  public signout: Function

  public isThid: boolean = true

  getUserInfo(username: string): void {
    UserApi.getUserInfo({ username: username })
      .then(data => {
        this.profile = data.user
        this.profile.pic = PicUrl.getUrl(data.user.pic, data.user.email)
        this.profile.lastSignin = data.user.last_login

        this.isThid = data.user.third !== 'none'
      }).catch(() => {
        this.router.navigate(['/'])
      })
  }

  getReplies(username: string): void {
    if (!this.itsMe) {
      return
    }
    CommentApi.getAccountSubComments(username)
      .then(data => {
        data.results.map(self => {
          let reply = {
            replyUser: {
              nickname: self.reply_user.nickname,
              username: self.reply_user.username,
              pic: PicUrl.getUrl(self.reply_user.pic, self.reply_user.email)
            },
            article: self.head.article,
            content: self.content,
            time: self.reply_time
          }
          this.replies.unshift(reply)
        })
      })
  }

  getRepliesOfArticle(user: any): void {
    if (+user.id === 1 || +user.id === 2) {
      this.supperUser = true
      CommentApi.getAllComments()
        .then((data) => {

          data.results.map(self => {
            let reply = {
              replyUser: {
                nickname: self.reply_user.nickname,
                pic: PicUrl.getUrl(self.reply_user.pic, self.reply_user.email),
                username: self.reply_user.username
              },
              article: self.article,
              content: self.content,
              time: self.reply_time
            }
            this.repliesOfArticle.unshift(reply)
          })

        })
    } else {
      this.supperUser = false
    }
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ts: TranslateService
  ) { }

  init() {

    this.sub = this.route.params
      .subscribe(params => {
        if (params) {
          let username = params['user']
          this.getUserInfo(username)

          UserService.get().then(userInfo => {
            if (userInfo) {
              this.itsMe = itsMe(userInfo.username, username)
              this.getReplies(userInfo.username)
              this.getRepliesOfArticle(userInfo)
            }
          })

          UserService.updateUser$.subscribe(userInfo => {
            if (UserService.isSignin()) {
              this.itsMe = itsMe(userInfo.username, username)
            } else {
              this.itsMe = false
              this.router.navigate(['/'])
            }

            this.replies = []
            this.repliesOfArticle = []
            this.getReplies(userInfo.username)
            this.getRepliesOfArticle(userInfo)

          })
        }
      })

  }

  ngOnInit() {
    this.ts.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang
    })

    this.signout = () => {
      UserApi.signout().then(() => {
        UserService.clear()
      })
    }
    this.init()
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

}

function itsMe(a: string, b: string): boolean {
  return a === b
}
