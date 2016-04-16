import {Component, OnInit} from 'angular2/core';
import {NgForm, Control, ControlGroup, FormBuilder, Validators} from 'angular2/common';
import {ROUTER_DIRECTIVES, CanActivate, OnActivate, Router} from 'angular2/router';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {UserInterface} from './user.interface';
import {UserService} from './user.service';
import {TitleDirective} from '../title/title.directive';
import {PageAnimateDirective} from '../page-animate/page-animate.directive';
import validate from '../sign-modal/sign-modal.validate';
import {AlertService} from '../base/alert/alert.service';
import {AccountApi} from '../base/account/account.api';

@Component({
  template: require('./change-password.template.html'),
  pipes: [TranslatePipe],
  directives: [ROUTER_DIRECTIVES, TitleDirective, PageAnimateDirective]
})

@CanActivate((next, prev) => {

  return true;

})

export class ChangePasswordComponent implements OnActivate, OnInit {


  passwordForm: ControlGroup;

  public requesting: boolean = false;
  public data: any = {};

  submit() {
    this.requesting = true;
    AccountApi.changePassword(this.data)
    .then(data => {
      AlertService.show(data.msg);
      this.requesting = false;
    }).catch(msg => {
      AlertService.show(msg);
      this.requesting = false;
    });
  }

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
    this.passwordForm = fb.group({
      username: [
        '',
        Validators.compose([
          Validators.required,
          validate.checkUsername
        ])
      ],
      oldPassword: [
        '',
        Validators.compose([
          Validators.required,
          validate.checkPassword
        ])
      ],
      newPassword: [
        '',
        Validators.compose([
          Validators.required,
          validate.checkPassword
        ])
      ]
    });
  }

  routerOnActivate(next) {

    UserService.updateUser$.subscribe(userInfo => {

      if (!UserService.isSignin()) {
        this.router.navigate(['Index']);
      }

    });

  }

  ngOnInit() {

  }

}
