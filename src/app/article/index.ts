import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BaseModule} from '../base';

import {ArticleListComponent} from './article-list.component';
import {ArticleDetailComponent} from './article-detail.component';

import {
  components,
  pipes,
  directives
} from './article.declarations';

const ROUTER_CONFIG = [
  { path: ':category', component: ArticleListComponent },
  { path: ':category/:url', component: ArticleDetailComponent }
];

const RouteDeclarations = [
  ArticleListComponent,
  ArticleDetailComponent
];

@NgModule({
  declarations: [
    ...RouteDeclarations,

    ...components,
    ...pipes,
    ...directives
  ],
  imports: [
    BaseModule,
    RouterModule.forChild(ROUTER_CONFIG)
  ]
})
export class ArticleModule {

}
