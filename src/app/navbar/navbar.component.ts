import {Component} from 'angular2/core';

import {User} from 'app/user/user.interface'
import {USER} from 'app/user/user.mock'

@Component({
  selector: '[navbar]',
  template: require('./navbar.template.html'),
  styles: [
    require('./navbar.less')
  ]
})
export class NavbarComponent {
  public index: number = 0;
  public user: User;
  public isSignin: boolean = true;

  signIn() {
    console.log('singin');
  }

  signOut() {
    console.log('signout');
  }

  constructor() {
    this.user = USER;
  }
}
