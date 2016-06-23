import {
  provideRouter,
  RouterConfig
} from '@angular/router';

import {SigninCheck} from './user/signin-check';

import {IndexComponent} from './index/index.component';
import {ArticleListComponent} from './article/article-list.component';
import {ArticleDetailComponent} from './article/article-detail.component';
import {UserInfoComponent} from './user/user-info.component';
import {UserSettingComponent} from './user/setting.component';
import {ChangePasswordComponent} from './user/change-password.component';
import {ResetPasswordComponent} from './user/reset-password.component';
import {FourthIndexComponent} from './fourth/fourth.component';

export const routes: RouterConfig = [
  { path: '', component: IndexComponent },
  { path: 'article/:category', component: ArticleListComponent },
  { path: 'article/:category/:url', component: ArticleDetailComponent },
  // fix no user path
  { path: 'account/info', component: UserInfoComponent, canActivate: [SigninCheck] },
  { path: 'account/info/:user', component: UserInfoComponent, canActivate: [SigninCheck] },
  { path: 'account/setting', component: UserSettingComponent, canActivate: [SigninCheck] },
  {
    path: 'account/changePassword',
    component: ChangePasswordComponent,
    canActivate: [SigninCheck]
  },
  {
    path: 'account/resetPassword',
    component: ResetPasswordComponent,
    canActivate: [SigninCheck]
  },
  { path: 'self/links', component: FourthIndexComponent },

  { path: '404', component: IndexComponent },
  { path: '**', redirectTo: '/404', terminal: true }
];
export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  SigninCheck
];
