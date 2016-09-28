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
import { DomSanitizer } from '@angular/platform-browser'

import { UserService } from './user.service'
import { PageAnimateFn } from '../page-animate/page-animate'
import validate from '../sign-modal/sign-modal.validate'
import { AlertService } from '../base/alert/alert.service'
import { AccountApi } from '../base/account/account.api'
import { PicUrl } from '../base/pic-url/pic-url.service'
import { Checkmark } from '../base/icon'

@Component({
  selector: 'setting',
  templateUrl: './setting.template.html',
  animations: [
    PageAnimateFn()
  ]
})

export class UserSettingComponent implements OnInit {

  settingForm: FormGroup
  public icon = {
    checkmark: Checkmark
  }
  public settingPicModel: any

  public requesting: boolean = false
  public formChanged: boolean = false
  public setting: any

  canNotSubmit(): boolean {
    return (this.settingForm.pristine
      && !this.formChanged)
      || !this.settingForm.valid
      || this.requesting
  }

  public changeSex(e) {
    if (!e.source) {
      return
    }
    this.formChanged = true
  }

  changePic(e) {
    let files = e.target.files
    let pic = files[0]
    if (!pic) {
      return
    }
    this.setting.pic = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(pic))
    this.settingPicModel = pic
    this.formChanged = true
  }

  getUser(user) {
    if (!user) {
      this.router.navigate(['/'])
      return
    }
    this.setting = {
      username: user.username,
      email: user.email,
      nickname: user.nickname,
      pic: PicUrl.getUrl(user.pic, user.email),
      sex: user.sex,
      third: user.third
    }
    this.setting.sex.type += ''
  }

  submit() {
    this.requesting = true
    let formData = new FormData()
    formData.append('username', this.setting.username)
    formData.append('email', this.setting.email)
    formData.append('nickname', this.setting.nickname)
    formData.append('sex', this.setting.sex.type)
    formData.append('pic', this.settingPicModel)
    AccountApi.changeProfile(formData)
      .then(data => {
        AlertService.show(data.msg)
      }).catch((msg) => {
        AlertService.show(msg)
      })
      .then(() => {
        this.requesting = false
      })
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.settingForm = fb.group({
      username: [
        '',
        [
          Validators.required,
          validate.checkUsername
        ]
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
      ],
      sex: [],
      pic: []
    })
  }

  ngOnInit() {
    UserService.get().then(userInfo => {
      this.getUser(userInfo)
    })

    UserService.updateUser$.subscribe(userInfo => {

      if (!UserService.isSignin()) {
        this.router.navigate(['/'])
      }

    })
  }

}
