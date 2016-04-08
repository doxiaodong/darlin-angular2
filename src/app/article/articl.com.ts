import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {ArticleListComponent} from './article-list.component';
import {ArticleDetailComponent} from './article-detail.component';

@Component({
  template: `
    <div>hshshs</div>
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
