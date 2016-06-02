import {Component} from '@angular/core';
import {
  RouteConfig,
  ROUTER_DIRECTIVES
} from '@angular/router-deprecated';

import {ArticleListComponent} from './article-list.component';
import {ArticleDetailComponent} from './article-detail.component';

@Component({
  template: `
    <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  {path: '/:category', name: 'ArticlList', component: ArticleListComponent},
  {path: '/:category/:url', name: 'ArticlDetail', component: ArticleDetailComponent}
])
export class ArticlCom {

  constructor() {}

}
