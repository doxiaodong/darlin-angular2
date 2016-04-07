import {Component, ViewEncapsulation, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Title} from 'angular2/platform/browser';

import {MarkedService} from './base/marked/marked.service';

import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {MarkedComponent} from './base/marked/marked.component';

import {ArticleListComponent} from './article/article-list.component';

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
  directives: [ROUTER_DIRECTIVES, NavbarComponent, FooterComponent, MarkedComponent]
})
@RouteConfig([
  {path: '/', name: 'Index', component: ArticleListComponent},
  {path: '/article/:category', name: 'ArticleList', component: ArticleListComponent}
])
export class RootAppComponent implements OnInit {

  public article: string;

  onUserInfoUpdate(userInfo) {
    console.log('@output: ${userInfo}', userInfo);
  }

  constructor(
    title: Title,
    private userService: UserService
  ) {

    console.log(title.getTitle());
    title.setTitle('darlin.me');

    this.article = require('./base/marked/marked.mock.md');

  }

  ngOnInit() {

    this.userService.updateUser$.subscribe(userInfo => {
      console.log(userInfo);
    });

  }

}
