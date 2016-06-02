import {
  Component,
  OnInit
} from '@angular/core';
import {
  NgForm,
  Control,
  ControlGroup,
  FormBuilder,
  Validators
} from '@angular/common';
import {
  ROUTER_DIRECTIVES,
  CanActivate,
  OnActivate,
  Router
} from '@angular/router-deprecated';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {UserInterface} from './user.interface';
import {UserService} from './user.service';
import {TitleDirective} from '../title/title.directive';
import {PageAnimateDirective} from '../page-animate/page-animate.directive';
import validate from '../sign-modal/sign-modal.validate';
import {AlertService} from '../base/alert/alert.service';
import {AccountApi} from '../base/account/account.api';

@Component({
  template: require('./reset-password.template.html'),
  pipes: [TranslatePipe],
  directives: [ROUTER_DIRECTIVES, TitleDirective, PageAnimateDirective]
})

@CanActivate((next, prev) => {

  return true;

})

export class ResetPasswordComponent implements OnActivate, OnInit {


  passwordForm: ControlGroup;

  public requesting: boolean = false;
  public data: any = {};

  submit() {
    this.requesting = true;
    AccountApi.resetPassword(this.data)
    .then(data => {
      AlertService.show(data.msg);
    }).catch(msg => {
      AlertService.show(msg);
    })
    .then(() => {
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
