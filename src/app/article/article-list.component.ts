import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core'
import {
  ActivatedRoute
} from '@angular/router'

import { ArticleApi } from './article.api'
import { AbTranslateService } from '../translate'

import { PageAnimateFn } from '../page-animate/page-animate'
// import { NgForAnimateFn } from '../ngFor-animate/ngFor-animate'

@Component({
  selector: 'article-list',
  templateUrl: './article-list.template.html',
  animations: [
    // NgForAnimateFn(),
    PageAnimateFn()
  ]
})

export class ArticleListComponent implements OnInit, OnDestroy {

  public articles: Array<Object> = []
  public totalArticles: Array<Object> = []
  public searchArticle: string = ''
  private sub: any

  public lang: string
  public hasMore: boolean = false
  public page: number = 1

  public category: string

  changeSearch() {
    this.articles = this.totalArticles.filter((article) => {
      return article['title'].indexOf(this.searchArticle) !== -1
    })
  }

  getMoreArticles() {
    ArticleApi.getArticleList(this.category, this.page)
      .then(data => {
        if (data.next) {
          this.page += 1
          this.hasMore = true
        } else {
          this.hasMore = false
        }

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

          // test list performance
          // let r = 250
          // while (r > 1) {
          //   r--
          //   this.articles.push(article)
          // }
          this.totalArticles.push(article)
          if (article.title.indexOf(this.searchArticle) !== -1) {
            this.articles.push(article)
          }
          // setTimeout(() => {
          //   this.articles.push(article)
          // }, delay)
          // delay += 10

        })
      })
  }

  getArticles() {
    this.articles = []
    this.page = 1
    this.getMoreArticles()
  }

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    AbTranslateService.updateTranslate$.subscribe((lang: string) => {
      this.lang = lang
    })

    this.sub = this.route.params
      .subscribe(params => {
        if (params) {
          this.category = params['category']
          this.getArticles()
        }
      })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

}
