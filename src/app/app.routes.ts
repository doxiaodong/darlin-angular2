import {Routes} from '@angular/router';

import {IndexComponent} from './index/index.component';
import {FourthIndexComponent} from './fourth/fourth.component';
import {Page404Component} from './404/404.component';

// import {ArticleModule} from './article';
// import {UserModule} from './user';

// ArticleModule
import {ArticleListComponent} from './article/article-list.component';
import {ArticleDetailComponent} from './article/article-detail.component';

// UserModule
import {SigninCheck} from './user/signin-check';
import {UserInfoComponent} from './user/user-info.component';
import {UserSettingComponent} from './user/setting.component';
import {ChangePasswordComponent} from './user/change-password.component';
import {ResetPasswordComponent} from './user/reset-password.component';

export const ROUTES: Routes = [
  { path: '', component: IndexComponent },
  // { path: 'article', loadChildren: () => ArticleModule },
  // { path: 'account', loadChildren: () => UserModule },

  {
    path: 'article',
    children: [
      { path: ':category', component: ArticleListComponent },
      { path: ':category/:url', component: ArticleDetailComponent }
    ]
  },
  {
    path: 'account',
    children: [
      { path: 'info/:user', component: UserInfoComponent, canActivate: [SigninCheck] },
      { path: 'setting', component: UserSettingComponent, canActivate: [SigninCheck] },
      { path: 'changePassword', component: ChangePasswordComponent, canActivate: [SigninCheck] },
      { path: 'resetPassword', component: ResetPasswordComponent, canActivate: [SigninCheck] }
    ]
  },

  // { path: 'article', loadChildren: () => require('./article') },
  // { path: 'account', loadChildren: () => require('./user') },
  { path: 'self/links', component: FourthIndexComponent },

  { path: '404', component: Page404Component },
  { path: '**', redirectTo: '/404' }
];

export const RouteDeclarations = [
  IndexComponent,
  ArticleListComponent,
  ArticleDetailComponent,
  UserInfoComponent,
  UserSettingComponent,
  ChangePasswordComponent,
  ResetPasswordComponent,
  FourthIndexComponent,
  Page404Component
];
