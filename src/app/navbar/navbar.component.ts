import {
  Component,
  // Output,
  // EventEmitter,
  OnInit
} from '@angular/core';
import {
  ROUTER_DIRECTIVES,
  Router
} from '@angular/router';

import {TranslatePipe} from 'ng2-translate/ng2-translate';

import {UserInterface} from '../user/user.interface';
import {USER_NULL} from '../user/user.null';
import {UserService} from '../user/user.service';
import {AccountApi} from '../base/account/account.api';
import {SignModalService} from '../sign-modal/sign-modal.service';

@Component({
  selector: '[navbar]',
  templateUrl: './navbar.template.html',
  styles: [
    require('./navbar.less')
  ],
  pipes: [TranslatePipe],
  directives: [
    ROUTER_DIRECTIVES
  ]
})
export class NavbarComponent implements OnInit {
  public index: number = 0;
  public user: UserInterface = USER_NULL;
  public isSignin: boolean = false;

  // @Output() userInfoUpdateEmitter: EventEmitter<any> = new EventEmitter();

  signIn() {
    SignModalService.show();
  }

  signOut() {
    // console.log('signout');
    AccountApi.signout()
      .then(data => {
        this.user = UserService.clear();
      });
    // this.userInfoUpdateEmitter.emit(this.user);
  }

  configIndexNumber(path: string) {
    if (path === '/') {
      this.index = 0;
    }
    if (/^\/article\//.test(path)) {
      this.index = 1;
    }
    if (/^\/account\//.test(path)) {
      this.index = 2;
    }
    if (/^\/self\//.test(path)) {
      this.index = 3;
    }
  }

  constructor(
    private router: Router
  ) { }

  ngOnInit() {

    UserService.get()
      .then(userInfo => {
        this.user = UserService.save(userInfo);
        this.isSignin = UserService.isSignin();
      });

    UserService.updateUser$.subscribe(userInfo => {
      this.user = userInfo;
      this.isSignin = UserService.isSignin();
    });

    this.router.events.subscribe((val) => {
      if (val['state']) {
        this.configIndexNumber(val.url);
      }
    });

  }

}
