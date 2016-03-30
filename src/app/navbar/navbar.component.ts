import {Component, Output, EventEmitter} from 'angular2/core';

import {TranslatePipe} from 'ng2-translate/ng2-translate';

import {UserInterface} from '../user/user.interface';
import {USER} from '../user/user.mock';
import {UserService} from '../user/user.service';
import {BaseApi} from '../base/api/base.api';

@Component({
  selector: '[navbar]',
  template: require('./navbar.template.html'),
  styles: [
    require('./navbar.less')
  ],
  providers: [BaseApi],
  pipes: [TranslatePipe]
})
export class NavbarComponent {
  public index: number = 0;
  public user: UserInterface;
  public isSignin: boolean = true;

  private userService: UserService;

  @Output() userInfoUpdateEmitter: EventEmitter<any> = new EventEmitter();

  signIn() {
    console.log('singin');
    this.user = this.userService.save(USER);
    this.isSignin = true;

    this.userInfoUpdateEmitter.emit(this.user);
  }

  overview(base: BaseApi) {
    base.overview()
    .then(userInfo => {
      if (userInfo.user) {
        this.user = this.userService.save(userInfo);
      }
    });
  }

  signOut() {
    console.log('signout');
    this.user = this.userService.clear();
    this.isSignin = false;

    this.userInfoUpdateEmitter.emit(this.user);
  }

  constructor(us: UserService, base: BaseApi) {
    this.userService = us;
    this.user = USER;

    this.overview(base);

    us.updateUser$.subscribe(userInfo => {
      console.log(userInfo);
    });
  }
}
