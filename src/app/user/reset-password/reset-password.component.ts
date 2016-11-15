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
    UserApi.resetPassword(this.data)
      .then(data => {
        AlertService.show(data.msg)
      }).catch(msg => {
        // AlertService.show(msg)
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
