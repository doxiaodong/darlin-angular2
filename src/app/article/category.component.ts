import {
  Component,
  ViewEncapsulation,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';

import {CategoryService} from './category.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: '[article-categories]',
  templateUrl: './category.template.html',
  styles: [
    require('./category.less')
  ],
  providers: [CategoryService]
})

export class ArticleCategoryComponent implements OnInit, OnDestroy {

  public categories: Array<Object> = [];
  public articleCategory: string;
  private sub: any;

  getCategories() {

    this.categories = this.categoryService.getCategories();

  }

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit() {

    this.sub = this.route.params
      .subscribe(params => {
        if (params) {
          let category = params['category'];
          this.articleCategory = category;

          this.getCategories();
        }
      });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
