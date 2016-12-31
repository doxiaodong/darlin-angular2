import {
  Component,
  OnInit
} from '@angular/core'
import {
  TranslateService,
  LangChangeEvent
} from 'ng2-translate'

import { ArticleApi } from 'app/article/api/article.api'
import { PageAnimateFn } from 'app/share/declarations/page-animate/page-animate'
// import { NgForAnimateFn } from '../ngFor-animate/ngFor-animate'

@Component({
  selector: 'comp-index',
  templateUrl: './index.template.html',
  animations: [
    // NgForAnimateFn(),
    PageAnimateFn()
  ]
})

export class IndexComponent implements OnInit {

  public lang: string
  public articles: Array<Object> = []

  getArticles(category: string) {
    ArticleApi.getArticleList(category)
      .then(data => {
        // let delay: number = 0
        data.results.map(a => {
          let article = {
            url: base64.Base64.encodeURI(a.url),
            title: a.title,
            createTime: a.create_time,
            category: a.category.url,
            isUp: a.is_up,
            isHot: a.hot
          }
          this.articles.push(article)
          // setTimeout(() => {
          //   this.articles.push(article)
          // }, delay)
          // delay += 100
        })
      })

  }

  constructor(private ts: TranslateService) { }

  ngOnInit() {
    this.ts.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang
    })

    let category = 'hot'

    this.getArticles(category)

  }

}
