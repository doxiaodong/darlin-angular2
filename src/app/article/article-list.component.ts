import {Component, ViewEncapsulation, OnInit} from 'angular2/core';
import {DatePipe} from 'angular2/common';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {UrlSafeBase64Service} from '../base/base64/base64safe.service';

import {ArticleApi} from './article.api';

import {ArticleCategoryComponent} from './category.component';

@Component({
  encapsulation: ViewEncapsulation.None,
  template: require('./article-list.template.html'),
  providers: [ArticleApi],
  pipes: [DatePipe, TranslatePipe],
  directives: [ROUTER_DIRECTIVES, ArticleCategoryComponent]
})

export class ArticleListComponent implements OnInit {

  public articles: Array<Object> = [];

  getArticles(category: string) {
    this.articleApi.getArticleList(category)
    .then(data => {

      data.results.map(a => {
        let article = {
          url: this.b64.encode(a.url),
          title: a.title,
          createTime: new Date(a.create_time),
          category: a.category.url,
          isUp: a.is_up,
          isHot: a.hot
        };

        // test list performance
        // let r = 250;
        // while (r > 1) {
        //   r--;
        //   this.articles.push(article);
        // }

        this.articles.push(article);

      });
    });

  }

  constructor(
    private routeParams: RouteParams,
    private articleApi: ArticleApi,
    private b64: UrlSafeBase64Service
  ) {

  }

  ngOnInit() {

    let category = this.routeParams.get('category');

    this.getArticles(category);
    console.log(category);
  }

}
