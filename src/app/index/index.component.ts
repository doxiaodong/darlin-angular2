import {
  Component,
  OnInit
} from '@angular/core';

import {ArticleApi} from '../article/article.api';
import {PageAnimateFn} from '../page-animate/page-animate';
// import {NgForAnimateFn} from '../ngFor-animate/ngFor-animate';

@Component({
  selector: 'index',
  templateUrl: './index.template.html',
  animations: [
    // NgForAnimateFn(),
    PageAnimateFn()
  ]
})

export class IndexComponent implements OnInit {

  public articles: Array<Object> = [];

  getArticles(category: string) {
    ArticleApi.getArticleList(category)
      .then(data => {
        let delay: number = 0;
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
          // setTimeout(() => {
          //   this.articles.push(article);
          // }, delay);
          // delay += 100;
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
