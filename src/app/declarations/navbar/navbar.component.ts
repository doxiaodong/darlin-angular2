import {
  Component,
  OnInit
} from '@angular/core'
import {
  Router,
  NavigationStart,
  NavigationCancel,
  NavigationError,
  NavigationEnd
} from '@angular/router'

import { UserInterface } from 'app/user/service/user.interface'
import { USER_NULL } from 'app/user/service/user.null'
import { UserService } from 'app/user/service/user.service'
import { UserApi } from 'app/user/api/user.api'
import { SignModalService } from '../sign-modal/sign-modal.service'
import { LoadingService } from '../loading/loading.service'

@Component({
  selector: 'comp-navbar',
  templateUrl: './navbar.template.html',
  styleUrls: [
    './navbar.less'
  ]
})
export class NavbarComponent implements OnInit {
  public index: number = 0
  public user: UserInterface = USER_NULL
  public isSignin: boolean = false

  signIn() {
    SignModalService.show()
  }

  signOut() {
    UserApi.signout()
      .then(data => {
        this.user = UserService.clear()
      })
  }

  configIndexNumber(path: string) {
    if (path === '/') {
      this.index = 0
    }
    if (/^\/article\//.test(path)) {
      this.index = 1
    }
    if (/^\/account\//.test(path)) {
      this.index = 2
    }
    if (/^\/self\//.test(path)) {
      this.index = 3
    }
  }

  constructor(
    private router: Router
  ) { }

  ngOnInit() {

    UserService.get()
      .then(userInfo => {
        this.user = UserService.save(userInfo)
        this.isSignin = UserService.isSignin()
      })

    UserService.updateUser$.subscribe(userInfo => {
      this.user = userInfo
      this.isSignin = UserService.isSignin()
    })

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.configIndexNumber(val.url)
      }
      if (val instanceof NavigationStart) {
        LoadingService.show()
      }
      if (
        val instanceof NavigationCancel ||
        val instanceof NavigationError ||
        val instanceof NavigationEnd
      ) {
        LoadingService.hide()
      }
    })

  }

}
