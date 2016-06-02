import {
  Component,
  ViewEncapsulation,
  OnInit
} from '@angular/core';
import {
  RouteParams,
  ROUTER_DIRECTIVES
} from '@angular/router-deprecated';

import {TranslatePipe} from 'ng2-translate/ng2-translate';

import {CategoryService} from './category.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: '[article-categories]',
  template: require('./category.template.html'),
  styles: [
    require('./category.less')
  ],
  providers: [CategoryService],
  pipes: [TranslatePipe],
  directives: [ROUTER_DIRECTIVES]
})

export class ArticleCategoryComponent implements OnInit {

  public categories: Array<Object> = [];
  public articleCategory: string;

  getCategories() {

    this.categories = this.categoryService.getCategories();

  }

  constructor(
    private routeParams: RouteParams,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit() {

    let category = this.routeParams.get('category');
    this.articleCategory = category;

    this.getCategories();

  }

}
