import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core'
import {
  Router,
  ActivatedRoute
} from '@angular/router'

import { ArticleApi } from './article.api'
import { AbTranslateService } from '../translate'

import { PageAnimateFn } from '../page-animate/page-animate'

@Component({
  selector: 'article-detail',
  templateUrl: './article-detail.template.html',
  animations: [
    PageAnimateFn()
  ]
})

export class ArticleDetailComponent implements OnInit, OnDestroy {

  public article: Object
  private sub: any

  public lang: string

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
        }

      })
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {

    AbTranslateService.updateTranslate$.subscribe((lang: string) => {
      this.lang = lang
    })

    this.sub = this.route.params
      .subscribe(params => {
        if (params) {
          let url = base64.Base64.decode(params['url'])
          this.getArticleDetail(url)
        }
      })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

}
