import {Component, ViewEncapsulation} from 'angular2/core';
import {Title} from 'angular2/platform/browser';

import {MarkedService} from './base/marked/marked.service';

import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {MarkedComponent} from './base/marked/marked.component';

import {UserService} from './user/user.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'root-app',
  template: require('./app.template.html'),
  styles: [
    require('../../config/icon.font.json'),
    require('./base/styles/global.less')
  ],
  providers: [Title, MarkedService],
  directives: [NavbarComponent, FooterComponent, MarkedComponent]
})
export class RootAppComponent {

  public article: string;

  onUserInfoUpdate(userInfo) {
    console.log('@output: ${userInfo}', userInfo);
  }

  constructor(
    title: Title,
    us: UserService
  ) {

    us.updateUser$.subscribe(userInfo => {
      console.log(111, userInfo);
    });

    console.log(title.getTitle());
    title.setTitle('darlin.me');

    this.article = require('./base/marked/marked.mock.md');

  }
}
