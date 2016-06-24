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
import {
  MdRadioGroup,
  MdRadioButton,
  MdRadioDispatcher
} from '@angular2-material/radio';

import {UserService} from './user.service';
import {TitleDirective} from '../title/title.directive';
import {PageAnimateDirective} from '../page-animate/page-animate.directive';
import {PageAnimateFn} from '../page-animate/page-animate';
import validate from '../sign-modal/sign-modal.validate';
import {AlertService} from '../base/alert/alert.service';
import {AccountApi} from '../base/account/account.api';
import {PicUrl} from '../base/pic-url/pic-url.service';

@Component({
  selector: 'setting',
  templateUrl: './setting.template.html',
  pipes: [TranslatePipe],
  providers: [MdRadioDispatcher],
  directives: [
    ROUTER_DIRECTIVES,
    TitleDirective,
    PageAnimateDirective,
    MdRadioButton,
    MdRadioGroup
  ],
  animations: [
    PageAnimateFn()
  ]
})

export class UserSettingComponent implements OnInit {

  settingForm: ControlGroup;

  public settingPicModel: any;

  public requesting: boolean = false;
  public formChanged: boolean = false;
  public setting: any;

  canNotSubmit(): boolean {
    return (this.settingForm.pristine
      && !this.formChanged)
      || !this.settingForm.valid
      || this.requesting;
  }

  public changeSex(e) {
    if (!e.source) {
      return;
    }
    this.formChanged = true;
  }

  public changePic(e) {
    let files = e.target.files;
    let pic = files[0];
    if (!pic) {
      return;
    }
    this.setting.pic = window.URL.createObjectURL(pic);
    this.settingPicModel = pic;
    this.formChanged = true;
  }

  getUser(user) {
    if (!user) {
      this.router.navigate(['/']);
      return;
    }
    this.setting = {
      username: user.username,
      email: user.email,
      nickname: user.nickname,
      pic: PicUrl.getUrl(user.pic),
      sex: user.sex,
      third: user.third
    };
    this.setting.sex.type += '';
  }

  submit() {
    this.requesting = true;
    let formData = new FormData();
    formData.append('username', this.setting.username);
    formData.append('email', this.setting.email);
    formData.append('nickname', this.setting.nickname);
    formData.append('sex', this.setting.sex.type);
    formData.append('pic', this.settingPicModel);
    AccountApi.changeProfile(formData)
    .then(data => {
      AlertService.show(data.msg);
    }).catch((msg) => {
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
    this.settingForm = fb.group({
      username: [
        '',
        Validators.compose([
          Validators.required,
          validate.checkUsername
        ])
      ],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
        ])
      ],
      nickname: [
        '',
        Validators.maxLength(10)
      ],
      pic: []
    });
  }

  ngOnInit() {
    UserService.get().then(userInfo => {
      this.getUser(userInfo);
    });

    UserService.updateUser$.subscribe(userInfo => {

      if (!UserService.isSignin()) {
        this.router.navigate(['/']);
      }

    });
  }

}
