import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  Router,
  ActivatedRoute,
  ROUTER_DIRECTIVES
} from '@angular/router';

import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {TitleDirective} from '../title/title.directive';

import {ArticleApi} from './article.api';

import {ArticleCategoryComponent} from './category.component';
import {CommentComponent} from '../comment/comment.component';
import {MarkedComponent} from '../base/marked/marked.component';
import {XdDatePipe} from '../base/xd-date/xd-date.pipe';
import {PageAnimateDirective} from '../page-animate/page-animate.directive';
import {PageAnimateFn} from '../page-animate/page-animate';

@Component({
  selector: 'article-detail',
  templateUrl: './article-detail.template.html',
  pipes: [XdDatePipe, TranslatePipe],
  directives: [
    ROUTER_DIRECTIVES,
    TitleDirective,
    ArticleCategoryComponent,
    CommentComponent,
    MarkedComponent,
    PageAnimateDirective
  ],
  animations: [
    PageAnimateFn()
  ]
})

export class ArticleDetailComponent implements OnInit, OnDestroy {

  public article: Object;
  private sub: any;

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
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.sub = this.route.params
    .subscribe(params => {
      if (params) {
        let url = base64.Base64.decode(params['url']);
        this.getArticleDetail(url);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
