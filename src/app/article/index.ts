import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { ShareModule } from '../share'

import { ArticleListComponent } from './list'
import { ArticleDetailComponent } from './detail'

import {
  components,
  pipes,
  directives
} from './declarations'

const ROUTER_CONFIG = [
  { path: ':category', component: ArticleListComponent },
  { path: ':category/:url', component: ArticleDetailComponent }
]

const RouteDeclarations = [
  ArticleListComponent,
  ArticleDetailComponent
]

@NgModule({
  declarations: [
    ...RouteDeclarations,

    ...components,
    ...pipes,
    ...directives
  ],
  imports: [
    ShareModule,
    RouterModule.forChild(ROUTER_CONFIG)
  ]
})
export class ArticleModule {
  constructor() { }
}
