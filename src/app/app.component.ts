import {Component, ViewEncapsulation} from 'angular2/core';
import {Title} from 'angular2/platform/browser';

import {
  TranslateService,
  TranslatePipe,
  LangChangeEvent
} from 'ng2-translate/ng2-translate';

import {NavbarComponent} from './navbar/navbar.component';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'root-app',
  template: require('./app.template.html'),
  styles: [
    require('../../config/icon.font.json'),
    require('./base/styles/global.less')
  ],
  providers: [Title, TranslateService],
  directives: [NavbarComponent]
})
export class RootAppComponent {

  onSignOut() {
    console.log('signout-app')
  }

  constructor(title: Title, translate: TranslateService) {
    translate.use('zh_CN');
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log(event);
    })
    console.log(title.getTitle());
    title.setTitle('darlin.me');
  }
}
