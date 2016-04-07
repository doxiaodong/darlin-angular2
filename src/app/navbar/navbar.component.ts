import {Component, Output, EventEmitter, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';

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
  pipes: [TranslatePipe],
  directives: [ROUTER_DIRECTIVES]
})
export class NavbarComponent implements OnInit {
  public index: number = 0;
  public user: UserInterface;
  public isSignin: boolean = true;

  @Output() userInfoUpdateEmitter: EventEmitter<any> = new EventEmitter();

  signIn() {
    console.log('singin');
    this.user = this.userService.save(USER);
    this.isSignin = true;

    this.userInfoUpdateEmitter.emit(this.user);
  }

  overview() {
    this.base.overview()
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
    private router: Router
  ) {
    this.user = USER;

  }

  ngOnInit() {

    this.overview();

    this.userService.updateUser$.subscribe(userInfo => {
      console.log(userInfo);
    });

    this.router.subscribe((val) => {
      this.configIndexNumber(val);
    });

  }

}
