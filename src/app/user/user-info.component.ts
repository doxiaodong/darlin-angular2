import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES, CanActivate, OnActivate, Router} from 'angular2/router';
import {SignModalService} from '../sign-modal/sign-modal.service';
import {UserInterface} from './user.interface';
import {UserService} from './user.service';

@Component({
  template: require('./user-info.template.html'),
  directives: [ROUTER_DIRECTIVES]
})

@CanActivate((next, prev) => {
  return UserService.get().then(() => {
    if (!UserService.isSignin()) {
      SignModalService.show();
    }
    return Promise.resolve(UserService.isSignin());
  });

})

export class UserInfoComponent implements OnActivate, OnInit {

  private user: UserInterface;

  constructor(
    private router: Router
  ) {}

  routerOnActivate(next) {
    this.user = UserService.get();
  }

  ngOnInit() {
    UserService.updateUser$.subscribe(userInfo => {
      this.router.navigate(['Index']);
    });
  }

}


