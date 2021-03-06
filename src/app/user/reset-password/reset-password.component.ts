import {
  Component,
  OnInit
} from '@angular/core'
import {
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms'
import { Router } from '@angular/router'
import { UserService } from 'app/user/service/user.service'
import { PageAnimateFn } from 'app/share/declarations/page-animate/page-animate'
import validate from 'app/declarations/sign-modal/sign-modal.validate'
import { AlertService } from 'app/declarations/alert/alert.service'
import { UserApi } from 'app/user/api/user.api'
import { Checkmark } from 'app/share/icon'
import {
  IRequestParams,
  requesting
} from 'app/base/requesting'

const request: IRequestParams = {
  requesting: false
}

@Component({
  selector: 'comp-reset-password',
  templateUrl: './reset-password.template.html',
  animations: [
    PageAnimateFn()
  ]
})

export class ResetPasswordComponent implements OnInit {
  passwordForm: FormGroup
  public icon = {
    checkmark: Checkmark
  }
  get requesting() {
    return request.requesting
  }
  public data: any = {}

  @requesting(request)
  submit() {
    return UserApi.resetPassword(this.data)
      .then(data => {
        GLOBAL_VALUE.TRANSLATE.get('pages.reset.success').subscribe((value: string) => {
          AlertService.show(value)
        })
      })
  }

  constructor(
    private router: Router,
    fb: FormBuilder
  ) {
    this.passwordForm = fb.group({
      username: [
        '',
        [
          Validators.required,
          validate.checkUsername
        ]
      ],
      newPassword: [
        '',
        [
          Validators.required,
          validate.checkPassword
        ]
      ]
    })
  }

  ngOnInit() {
    UserService.updateUser$.subscribe(userInfo => {

      if (!UserService.isSignin()) {
        this.router.navigate(['/'])
      }

    })
  }

}
