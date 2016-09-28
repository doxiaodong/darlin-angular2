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
import { UserService } from './user.service'
import { PageAnimateFn } from '../page-animate/page-animate'
import validate from '../sign-modal/sign-modal.validate'
import { AlertService } from '../base/alert/alert.service'
import { AccountApi } from '../base/account/account.api'
import { Checkmark } from '../base/icon'
@Component({
  selector: 'reset-password',
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
  public requesting: boolean = false
  public data: any = {}

  submit() {
    this.requesting = true
    AccountApi.resetPassword(this.data)
      .then(data => {
        AlertService.show(data.msg)
      }).catch(msg => {
        AlertService.show(msg)
      })
      .then(() => {
        this.requesting = false
      })
  }

  constructor(
    private router: Router,
    private fb: FormBuilder
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
