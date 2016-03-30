import {Component, ViewEncapsulation} from 'angular2/core';
import {Title} from 'angular2/platform/browser';

import {MarkedService} from './base/marked/marked.service';

import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {MarkedComponent} from './base/marked/marked.component';
import {BaseApi} from './base/api/base.api';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'root-app',
  template: require('./app.template.html'),
  styles: [
    require('../../config/icon.font.json'),
    require('./base/styles/global.less')
  ],
  providers: [Title, BaseApi, MarkedService],
  directives: [NavbarComponent, FooterComponent, MarkedComponent]
})
export class RootAppComponent {

  public article: string;

  onSignOut() {
    console.log('signout-app')
  }

  overview(base: BaseApi) {
    base.overview()
    // .subscribe((res) => {
    //   console.log(res);
    // });
  }

  constructor(
    title: Title,
    base: BaseApi
  ) {

    console.log(title.getTitle());
    title.setTitle('darlin.me');

    this.overview(base);

    this.article = require('./base/marked/marked.mock.md');

  }
}
