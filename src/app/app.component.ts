import {Component, ViewEncapsulation} from 'angular2/core';
import {Title} from 'angular2/platform/browser';

import {NavbarComponent} from './navbar/navbar.component';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'root-app',
  template: require('./app.template.html'),
  styles: [
    require('./base/styles/global.less')
  ],
  providers: [Title],
  directives: [NavbarComponent]
})
export class RootAppComponent {
  constructor(title: Title) {
    console.log(title.getTitle());
    title.setTitle('darlin.me');
  }
}
