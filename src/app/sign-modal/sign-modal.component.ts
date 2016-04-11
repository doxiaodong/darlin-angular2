import {Component, OnInit} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {TranslatePipe} from 'ng2-translate/ng2-translate';

import {UserInterface} from '../user/user.interface';
import {USER} from '../user/user.mock';
import {UserService} from '../user/user.service';
import {SignModalService} from './sign-modal.service';
import {LocalStorageService} from '../base/local-storage/local-storage.service';

import {AccountApi} from '../base/account/account.api';

interface signinInterface {
  username: string;
  password: string;
}

interface registerInterface {
  username: string;
  password: string;
  email: string;
  nickname: string;
}

@Component({
  selector: '[sign-modal]',
  template: require('./sign-modal.template.html'),
  styles: [
    require('./sign-modal.less')
  ],
  pipes: [TranslatePipe],
  providers: [AccountApi]
})
export class SignModalComponent implements OnInit {

  public usernamePattern = /^\w{6,20}$/;
  public passwordPattern = /^\w{6,20}$/;
  public requesting: boolean = false;
  public showModal: boolean = false;
  public signinModel: boolean = true;


  public user: UserInterface;

  public signin: signinInterface;
  public register: registerInterface = {
    username: '',
    password: '',
    email: '',
    nickname: ''
  };

  closeShowModal() {
    this.showModal = false;
  }

  doSignin(obj: Object) {
    console.log('singin', obj);
    this.user = this.userService.save(USER);

    // sigin success
    this.local.save('signin.user', JSON.stringify(this.signin));
  }

  doSignout() {
    console.log('signout');
    this.user = this.userService.clear();
  }

  doRegister(obj: Object) {
    console.log('register', obj);
  }

  constructor(
    private userService: UserService,
    private signModalService: SignModalService,
    private local: LocalStorageService,
    private accountApi: AccountApi
  ) {

  }

  ngOnInit() {

    this.userService.updateUser$.subscribe(userInfo => {
      console.log(userInfo);
    });

    this.signModalService.showSignModal$.subscribe(() => {
      this.showModal = true;
    });

    let user = JSON.parse(this.local.get('signin.user'));
    if (user) {
      this.signin = user;
    } else {
      this.signin = {
        username: '',
        password: ''
      };
    }

    this.signin = JSON.parse(this.local.get('signin.user'));

  }

}
