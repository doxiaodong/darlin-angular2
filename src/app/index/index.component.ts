import {
  Component,
  OnInit
} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {TranslatePipe} from 'ng2-translate/ng2-translate';

import {TitleDirective} from '../title/title.directive';

import {ArticleApi} from '../article/article.api';
import {XdDatePipe} from '../base/xd-date/xd-date.pipe';
import {PageAnimateDirective} from '../page-animate/page-animate.directive';

@Component({
  template: require('./index.template.html'),
  pipes: [XdDatePipe, TranslatePipe],
  directives: [ROUTER_DIRECTIVES, TitleDirective, PageAnimateDirective]
})

export class IndexComponent implements OnInit {

  public articles: Array<Object> = [];

  getArticles(category: string) {
    ArticleApi.getArticleList(category)
    .then(data => {

      data.results.map(a => {
        let article = {
          url: base64.Base64.encodeURI(a.url),
          title: a.title,
          createTime: a.create_time,
          category: a.category.url,
          isUp: a.is_up,
          isHot: a.hot
        };

        this.articles.push(article);

      });
    });

  }

  constructor() {
  }

  ngOnInit() {

    let category = 'hot';

    this.getArticles(category);

  }

}
