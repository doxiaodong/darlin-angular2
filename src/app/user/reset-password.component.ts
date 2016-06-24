import {
  Component,
  OnInit
} from '@angular/core';
import {
  // Control,
  ControlGroup,
  FormBuilder,
  Validators
} from '@angular/common';
import {
  ROUTER_DIRECTIVES,
  Router
} from '@angular/router';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {UserService} from './user.service';
import {TitleDirective} from '../title/title.directive';
import {PageAnimateDirective} from '../page-animate/page-animate.directive';
import {PageAnimateFn} from '../page-animate/page-animate';
import validate from '../sign-modal/sign-modal.validate';
import {AlertService} from '../base/alert/alert.service';
import {AccountApi} from '../base/account/account.api';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.template.html',
  pipes: [TranslatePipe],
  directives: [ROUTER_DIRECTIVES, TitleDirective, PageAnimateDirective],
  animations: [
    PageAnimateFn()
  ]
})

export class ResetPasswordComponent implements OnInit {
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

  ngOnInit() {
    UserService.updateUser$.subscribe(userInfo => {

      if (!UserService.isSignin()) {
        this.router.navigate(['/']);
      }

    });
  }

}
