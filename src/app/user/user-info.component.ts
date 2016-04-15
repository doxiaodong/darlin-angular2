import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, CanActivate, OnActivate} from 'angular2/router';
import {SignModalService} from '../sign-modal/sign-modal.service';
import {UserInterface} from './user.interface';
import {UserService} from './user.service';

@Component({
  template: require('./user-info.template.html'),
  directives: [ROUTER_DIRECTIVES]
})

@CanActivate((next, prev) => {
  if (!UserService.get() || UserService.get().id === -1) {

    SignModalService.show();

    return false;
  }


  return true;

})

export class UserInfoComponent implements OnActivate {

  private user: UserInterface;

  constructor() {}

  routerOnActivate(next) {
    this.user = UserService.get();
  }

}


