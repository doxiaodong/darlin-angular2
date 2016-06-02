import {
  Component,
  ViewEncapsulation,
  OnInit
} from '@angular/core';
import {
  RouteConfig,
  ROUTER_DIRECTIVES
} from '@angular/router-deprecated';
import {TranslatePipe} from 'ng2-translate/ng2-translate';

import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {AlertComponent} from './base/alert/alert.component';

import {IndexComponent} from './index/index.component';
import {ArticleListComponent} from './article/article-list.component';
import {ArticleDetailComponent} from './article/article-detail.component';
import {UserInfoComponent} from './user/user-info.component';
import {UserSettingComponent} from './user/setting.component';
import {ChangePasswordComponent} from './user/change-password.component';
import {ResetPasswordComponent} from './user/reset-password.component';
import {SignModalComponent} from './sign-modal/sign-modal.component';
import {LoadingComponent} from './base/loading/loading.component';

import {ArticlCom} from './article/articl.com'; // test child router
import {FourthIndexComponent} from './fourth/fourth.component';

require('../../config/icon.font.json');
require('./base/styles/global.less');
require('./article/article-list.global.less');

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'root-app',
  template: require('./app.template.html'),
  styles: [
    // require('../../config/icon.font.json'),
    // require('./base/styles/global.less'),
    // require('./article/article-list.less')
  ],
  pipes: [TranslatePipe],
  directives: [ROUTER_DIRECTIVES, NavbarComponent, FooterComponent, AlertComponent, SignModalComponent, LoadingComponent]
})
@RouteConfig([
  {path: '/', name: 'Index', component: IndexComponent, useAsDefault: true},

  {path: '/articl/...', name: 'Articl', component: ArticlCom}, // test child router
  {path: '/article/:category', name: 'ArticleList', component: ArticleListComponent},
  {path: '/article/:category/:url', name: 'ArticleDetail', component: ArticleDetailComponent},

  {path: '/account/info/:user', name: 'UserInfo', component: UserInfoComponent},
  {path: '/account/setting', name: 'UserSetting', component: UserSettingComponent},
  {path: '/account/changePassword', name: 'ChangePassword', component: ChangePasswordComponent},
  {path: '/account/resetPassword', name: 'ResetPassword', component: ResetPasswordComponent}, // admin

  {path: '/self/links', name: 'FourthIndex', component: FourthIndexComponent},

  {path: '/*path', redirectTo: ['Index']}
])
export class RootAppComponent implements OnInit {

  // onUserInfoUpdate(userInfo) {
  //   console.log('@output: ${userInfo}', userInfo);
  // }

  constructor() {}

  ngOnInit() {

  }

}
