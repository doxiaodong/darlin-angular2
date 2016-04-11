import {Component, OnInit} from 'angular2/core';
import {DatePipe} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {TranslatePipe} from 'ng2-translate/ng2-translate';

import {TitleDirective} from '../title/title.directive';

import {UrlSafeBase64Service} from '../base/base64/base64safe.service';

import {ArticleApi} from '../article/article.api';

@Component({
  template: require('./index.template.html'),
  providers: [ArticleApi],
  pipes: [DatePipe, TranslatePipe],
  directives: [ROUTER_DIRECTIVES, TitleDirective]
})

export class IndexComponent implements OnInit {

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

        this.articles.push(article);

      });
    });

  }

  constructor(
    private articleApi: ArticleApi,
    private b64: UrlSafeBase64Service
  ) {
  }

  ngOnInit() {

    let category = 'hot';

    this.getArticles(category);

  }

}
