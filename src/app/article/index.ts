import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BaseModule} from '../base';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {AbTranslateService} from '../translate';

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
  constructor(
    ts: TranslateService
  ) {
    ts.use(AbTranslateService.lang);
    AbTranslateService.updateTranslate$.subscribe((lang: string) => {
      ts.use(lang);
    });
  }
}
