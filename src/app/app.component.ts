import {Component, ViewEncapsulation} from 'angular2/core';
import {Title} from 'angular2/platform/browser';

import {
  TranslateService,
  TranslatePipe,
  LangChangeEvent
} from 'ng2-translate/ng2-translate';

import {NavbarComponent} from './navbar/navbar.component';
import {BaseApi} from './base/api/base.api';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'root-app',
  template: require('./app.template.html'),
  styles: [
    require('../../config/icon.font.json'),
    require('./base/styles/global.less')
  ],
  providers: [Title, TranslateService, BaseApi],
  directives: [NavbarComponent]
})
export class RootAppComponent {

  onSignOut() {
    console.log('signout-app')
  }

  overview(base: BaseApi) {
    base.overview()
    .subscribe((res) => {
      console.log(res);
    })
  }

  constructor(title: Title, translate: TranslateService, base: BaseApi) {
    translate.use('zh_CN');
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log(event);
    })
    console.log(title.getTitle());
    title.setTitle('darlin.me');

    this.overview(base);
  }
}
