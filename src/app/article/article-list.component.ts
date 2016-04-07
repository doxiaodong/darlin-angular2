import {Component, Input, ViewEncapsulation, OnInit} from 'angular2/core';
import {DatePipe} from 'angular2/common';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {LocalStorageService} from '../base/local-storage/local-storage.service';

import {ArticleApi} from './article.api';

@Component({

  template: require('./article-list.template.html'),
  styles: [
    require('./article-list.less')
  ],
  providers: [ArticleApi],
  pipes: [DatePipe, TranslatePipe],
  directives: [ROUTER_DIRECTIVES]
})

export class ArticleListComponent implements OnInit {

  public categories: Array<Object> = [];
  public articles: Array<Object> = [];
  public articleCategory: string;

  getCategories() {

    let categories = JSON.parse(this.local.getSession('article.categories'));
    if (!categories) {
      this.articleApi.getArticleCategories()
      .then(data => {

        this.categories.push({
          key: 'all',
          name: '全部'
        });

        data.results.map(c => {
          let category = {
            key: c.url,
            name: c.name
          };
          this.categories.push(category);
        });

        this.local.saveSession('article.categories', JSON.stringify(this.categories));

      });
    } else {
      this.categories = categories;
    }

  }

  getArticles(category: string) {
    this.articleApi.getArticleList(category)
    .then(data => {

      data.results.map(a => {
        let article = {
          url: a.url,
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
    private routeParams:RouteParams,
    private articleApi: ArticleApi,
    private local: LocalStorageService
  ) {
  }

  ngOnInit() {
    let category = this.routeParams.get('category');
    // index page
    if (category == null) {
      category = 'hot';
    }
    this.articleCategory = category;

    this.getCategories();

    this.getArticles(this.articleCategory);
  }

}
