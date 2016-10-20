import { Routes } from '@angular/router'

import { IndexComponent } from './index/index.component'
import { FourthIndexComponent } from './fourth/fourth.component'
import { Page404Component } from './404/404.component'

export const ROUTES: Routes = [
  { path: '', component: IndexComponent },

  { path: 'article', loadChildren: () => require('es6-promise-loader!./article')('ArticleModule') },
  { path: 'account', loadChildren: () => require('es6-promise-loader!./user')('UserModule') },
  { path: 'self/links', component: FourthIndexComponent },

  { path: '404', component: Page404Component },
  { path: '**', redirectTo: '/404' }
]

export const RouteDeclarations = [
  IndexComponent,
  FourthIndexComponent,
  Page404Component
]
