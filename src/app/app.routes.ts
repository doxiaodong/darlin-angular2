import {Routes} from '@angular/router';

import {IndexComponent} from './index/index.component';
import {FourthIndexComponent} from './fourth/fourth.component';
import {Page404Component} from './404/404.component';

export const ROUTES: Routes = [
  { path: '', component: IndexComponent },

  // {
  //   path: 'article',
  //   children: [
  //     { path: ':category', component: ArticleListComponent },
  //     { path: ':category/:url', component: ArticleDetailComponent }
  //   ]
  // },
  // {
  //   path: 'account',
  //   children: [
  //     { path: 'info/:user', component: UserInfoComponent, canActivate: [SigninCheck] },
  //     { path: 'setting', component: UserSettingComponent, canActivate: [SigninCheck] },
  //     { path: 'changePassword', component: ChangePasswordComponent, canActivate: [SigninCheck] },
  //     { path: 'resetPassword', component: ResetPasswordComponent, canActivate: [SigninCheck] }
  //   ]
  // },

  { path: 'article', loadChildren: () => require('es6-promise-loader!./article')('ArticleModule') },
  { path: 'account', loadChildren: () => require('es6-promise-loader!./user')('UserModule') },
  { path: 'self/links', component: FourthIndexComponent },

  { path: '404', component: Page404Component },
  { path: '**', redirectTo: '/404' }
];

export const RouteDeclarations = [
  IndexComponent,
  FourthIndexComponent,
  Page404Component
];
