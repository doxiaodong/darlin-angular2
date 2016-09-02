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

@Component({
  selector: 'change-password',
  templateUrl: './change-password.template.html',
  animations: [
    PageAnimateFn()
  ]
})

export class ChangePasswordComponent implements OnInit {
  passwordForm: FormGroup

  public requesting: boolean = false
  public data: any = {}

  submit() {
    this.requesting = true
    AccountApi.changePassword(this.data)
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
      oldPassword: [
        '',
        [
          Validators.required,
          validate.checkPassword
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
