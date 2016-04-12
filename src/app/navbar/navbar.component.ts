import {Component, Output, EventEmitter, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';

import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {VisibilityDirective} from '../visibility/visibility.directive';

import {UserInterface} from '../user/user.interface';
import {USER_NULL} from '../user/user.null';
import {UserService} from '../user/user.service';
import {BaseApi} from '../base/api/base.api';
import {AccountApi} from '../base/account/account.api';
import {SignModalService} from '../sign-modal/sign-modal.service';

@Component({
  selector: '[navbar]',
  template: require('./navbar.template.html'),
  styles: [
    require('./navbar.less')
  ],
  providers: [BaseApi, AccountApi],
  pipes: [TranslatePipe],
  directives: [ROUTER_DIRECTIVES, VisibilityDirective]
})
export class NavbarComponent implements OnInit {
  public index: number = 0;
  public user: UserInterface = USER_NULL;
  public isSignin: boolean = false;

  // @Output() userInfoUpdateEmitter: EventEmitter<any> = new EventEmitter();

  signIn() {
    this.signModalService.show();
  }

  overview() {
    this.base.overview()
    .then(userInfo => {
      if (userInfo.user) {
        let user: UserInterface = userInfo.user
        this.user = this.userService.save(user);
        this.isSignin = true;
      }
    });
  }

  signOut() {
    // console.log('signout');
    this.account.signout()
    .then(data => {
      this.user = this.userService.clear();
    });
    // this.userInfoUpdateEmitter.emit(this.user);
  }

  configIndexNumber(path: string) {
    if (path == '') {
      this.index = 0;
    }
    if (/^article\//.test(path)) {
      this.index = 1;
    }
    if (/^account\//.test(path)) {
      this.index = 2;
    }
    if (/^self\//.test(path)) {
      this.index = 3;
    }
  }

  constructor(
    private userService: UserService,
    private base: BaseApi,
    private account: AccountApi,
    private router: Router,
    private signModalService: SignModalService
  ) {}

  ngOnInit() {

    this.overview();

    this.userService.updateUser$.subscribe(userInfo => {
      this.user = userInfo;
      if (this.user && this.user.username) {
        this.isSignin = true;
      } else {
        this.isSignin = false;
      }
    });

    this.router.subscribe((val) => {
      this.configIndexNumber(val);
    });

  }

}
