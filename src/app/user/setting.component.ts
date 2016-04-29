import {Component, OnInit, Injector, provide} from 'angular2/core';
import {NgForm, Control, ControlGroup, FormBuilder, Validators} from 'angular2/common';
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, CanActivate, OnActivate, Router, RouteRegistry} from 'angular2/router';
import {RootRouter} from 'angular2/src/router/router';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {MdRadioGroup, MdRadioButton, MdRadioDispatcher} from '@angular2-material/radio';

import {UserInterface} from './user.interface';
import {UserService} from './user.service';
import {TitleDirective} from '../title/title.directive';
import {PageAnimateDirective} from '../page-animate/page-animate.directive';
import validate from '../sign-modal/sign-modal.validate';
import {AlertService} from '../base/alert/alert.service';
import {AccountApi} from '../base/account/account.api';
import {STATIC_URL_HOST, HEAD_PIC_STYLE} from '../base/constants/picture.constant';

@Component({
  template: require('./setting.template.html'),
  pipes: [TranslatePipe],
  providers: [MdRadioDispatcher],
  directives: [ROUTER_DIRECTIVES, TitleDirective, PageAnimateDirective, MdRadioButton, MdRadioGroup]
})

@CanActivate((next, prev) => {

  // let injector = Injector.resolveAndCreate([
  //   ROUTER_PROVIDERS,
  //   RouteRegistry,
  //   provide(Router, {useClass: RootRouter})
  // ]);
  // console.log(injector)
  // let router = injector.get(Router);

  // return UserService.get().then(() => {
  //   // if (!UserService.isSignin()) {
  //   //   this.router.navigate(['Index']);
  //   // }
  //   return Promise.resolve(UserService.isSignin());
  // });

  return true;

})

export class UserSettingComponent implements OnActivate, OnInit {

  canNotSubmit(): boolean {
    return (this.settingForm.pristine && !this.formChanged) || !this.settingForm.valid || this.requesting
  }
  settingForm: ControlGroup;

  public settingPicModel: any;

  public requesting: boolean = false;
  public formChanged: boolean = false;
  public setting: any;

  public changeSex() {
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
      this.router.navigate(['Index']);
      return;
    }
    this.setting = {
      username: user.username,
      email: user.email,
      nickname: user.nickname,
      pic: STATIC_URL_HOST + user.pic + HEAD_PIC_STYLE,
      sex: user.sex
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

  routerOnActivate(next) {

    UserService.get().then(userInfo => {
      this.getUser(userInfo);
    });

    UserService.updateUser$.subscribe(userInfo => {

      if (!UserService.isSignin()) {
        this.router.navigate(['Index']);
      }

    });

  }

  ngOnInit() {

  }

}
