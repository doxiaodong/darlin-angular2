import {Component, OnInit} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {TitleDirective} from '../title/title.directive';
import {UrlSafeBase64Service} from '../base/base64/base64safe.service';

import {ArticleApi} from './article.api';

import {ArticleCategoryComponent} from './category.component';
import {CommentComponent} from '../comment/comment.component';
import {MarkedComponent} from '../base/marked/marked.component';
import {XdDatePipe} from '../base/xd-date/xd-date.pipe';
import {PageAnimateDirective} from '../page-animate/page-animate.directive';

@Component({
  template: require('./article-detail.template.html'),
  providers: [ArticleApi],
  pipes: [XdDatePipe, TranslatePipe],
  directives: [
    ROUTER_DIRECTIVES,
    TitleDirective,
    ArticleCategoryComponent,
    CommentComponent,
    MarkedComponent,
    PageAnimateDirective
  ]
})

export class ArticleDetailComponent implements OnInit {

  public article: Object;

  getArticleDetail(url: string) {
    this.articleApi.getArticleDetail(url)
    .then(data => {
      this.article = {
        articleDetailTitle: data.title,
        category: {
          key: data.category.url,
          name: data.category.name
        },
        createTime: data.create_time,
        content: data.content
      };

    });

  }

  constructor(
    private routeParams: RouteParams,
    private articleApi: ArticleApi,
    private b64: UrlSafeBase64Service
  ) {
  }

  ngOnInit() {
    let url = this.b64.decode(this.routeParams.get('url'));
    this.getArticleDetail(url);
  }

}
