import { Routes } from '@angular/router'

import { IndexComponent } from './index/index.component'
import { FourthIndexComponent } from './fourth/fourth.component'
import { Page404Component } from './404/404.component'

export function loadChildrenArticle() {
  return require('es6-promise-loader!./article')('ArticleModule')
}

export function loadChildrenAccount() {
  return require('es6-promise-loader!./user')('UserModule')
}

export const ROUTES: Routes = [
  { path: '', component: IndexComponent },

  { path: 'article', loadChildren: loadChildrenArticle },
  { path: 'account', loadChildren: loadChildrenAccount },
  { path: 'self/links', component: FourthIndexComponent },

  { path: '404', component: Page404Component },
  { path: '**', redirectTo: '/404' }
]

export const RouteDeclarations = [
  IndexComponent,
  FourthIndexComponent,
  Page404Component
]
