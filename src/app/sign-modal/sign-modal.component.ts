import {
  Component,
  OnInit
} from '@angular/core'
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl
} from '@angular/forms'

import { UserInterface } from '../user/user.interface'
import { UserService } from '../user/user.service'
import { SignModalService } from './sign-modal.service'
import { LocalStorageService } from '../base/local-storage/local-storage.service'

import { AlertService } from '../base/alert/alert.service'
import { AccountApi } from '../base/account/account.api'
import validate from './sign-modal.validate'
import {
  Close,
  Checkmark
} from '../base/icon'

interface SigninInterface {
  username: string
  password: string
}

interface RegisterInterface {
  username: string
  password: string
  email: string
  nickname: string
}

@Component({
  selector: '[sign-modal]',
  templateUrl: './sign-modal.template.html',
  styles: [
    require('./sign-modal.less')
  ]
})
export class SignModalComponent implements OnInit {
  signinForm: FormGroup
  registerForm: FormGroup

  public icon = {
    close: Close,
    checkmark: Checkmark
  }
  public requesting: boolean = false
  public showModal: boolean = false
  public signinModel: boolean = true

  public qqImageSrc: string = require('../../image-loader/qq.png')
  public user: UserInterface

  public signin: SigninInterface
  public register: RegisterInterface = {
    username: '',
    password: '',
    email: '',
    nickname: ''
  }

  closeShowModal() {
    this.showModal = false
  }

  doSignin(obj: Object) {
    this.requesting = true
    AccountApi.signin(obj)
      .then(data => {
        this.user = UserService.save(data.user)

        // sigin success
        LocalStorageService.save('signin.user', JSON.stringify(this.signin))
        this.closeShowModal()
      }).catch((msg) => {
        AlertService.show(msg)
      })
      .then(() => {
        this.requesting = false
      })
  }

  doRegister(obj: any) {
    this.requesting = true
    AccountApi.register(obj)
      .then(data => {
        this.user = UserService.save(data.user)
        this.signin = {
          username: obj.username,
          password: obj.password
        }
        // sigin success
        LocalStorageService.save('signin.user', JSON.stringify(this.signin))
        this.closeShowModal()
      }).catch((msg) => {
        AlertService.show(msg)
      })
      .then(() => {
        this.requesting = false
      })
  }

  githubLogin() {
    if (this.requesting) {
      return
    }
    this.requesting = true
    AccountApi.githubLogin()
    this.closeShowModal()
  }

  qqLogin() {
    if (this.requesting) {
      return
    }
    this.requesting = true
    AccountApi.qqLogin()
    this.closeShowModal()
  }

  constructor(
    private fb: FormBuilder
  ) {
    this.signinForm = fb.group({
      username: [
        '',
        [
          Validators.required,
          validate.checkUsername
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          validate.checkPassword
        ]
      ]
    })

    this.registerForm = fb.group({
      r_username: [
        '',
        [
          Validators.required,
          validate.checkUsername
        ]
      ],
      r_password: [
        '',
        [
          Validators.required,
          validate.checkPassword
        ]
      ],
      r_rePassword: [
        '',
        (c: FormControl) => {
          return validate.confirmPassword(c, this.register.password)
        }
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
        ]
      ],
      nickname: [
        '',
        Validators.maxLength(10)
      ]

    })

  }

  ngOnInit() {

    SignModalService.showSignModal$.subscribe(() => {
      this.showModal = true
    })

    let user = JSON.parse(LocalStorageService.get('signin.user'))
    if (user) {
      this.signin = user
    } else {
      this.signin = {
        username: '',
        password: ''
      }
    }

  }

}
