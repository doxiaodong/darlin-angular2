import {
  Component,
  OnInit
} from '@angular/core';
import {
  RouteParams,
  ROUTER_DIRECTIVES
} from '@angular/router-deprecated';

import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {TitleDirective} from '../title/title.directive';
import b64 from '../base/base64/base64safe.service';

import {ArticleApi} from './article.api';

import {ArticleCategoryComponent} from './category.component';
import {CommentComponent} from '../comment/comment.component';
import {MarkedComponent} from '../base/marked/marked.component';
import {XdDatePipe} from '../base/xd-date/xd-date.pipe';
import {PageAnimateDirective} from '../page-animate/page-animate.directive';

@Component({
  template: require('./article-detail.template.html'),
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
    ArticleApi.getArticleDetail(url)
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
    private routeParams: RouteParams
  ) {
  }

  ngOnInit() {
    let url = b64.decode(this.routeParams.get('url'));
    this.getArticleDetail(url);
  }

}
