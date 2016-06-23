import {LocalStorageService} from '../base/local-storage/local-storage.service';

import {ArticleApi} from './article.api';

export class CategoryService {

  private categories: Array<Object> = [];

  getCategories(): Array<Object> {
    let categories = JSON.parse(LocalStorageService.getSession('article.categories'));
    if (!categories) {
      ArticleApi.getArticleCategories()
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

        LocalStorageService.saveSession('article.categories', JSON.stringify(this.categories));

      });
    } else {
      this.categories = categories;
    }

    return this.categories;

  }

  constructor() {

  }

}
