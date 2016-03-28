import {Component, Output, EventEmitter} from 'angular2/core';

import {TranslatePipe} from 'ng2-translate/ng2-translate';

import {UserInterface} from '../user/user.interface';
import {USER_NULL} from '../user/user.null';
import {USER} from '../user/user.mock';

@Component({
  selector: '[navbar]',
  template: require('./navbar.template.html'),
  styles: [
    require('./navbar.less')
  ],
  pipes: [TranslatePipe]
})
export class NavbarComponent {
  public index: number = 0;
  public user: UserInterface;
  public isSignin: boolean = true;

  @Output() signOutEmitter: EventEmitter<any> = new EventEmitter();

  signIn() {
    console.log('singin');
    this.user = USER;
    this.isSignin = true;
  }

  signOut() {
    console.log('signout');
    this.signOutEmitter.emit(null);
    this.user = USER_NULL;
    this.isSignin = false;
  }

  constructor() {
    this.user = USER;
  }
}
