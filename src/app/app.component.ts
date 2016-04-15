import {Component, ViewEncapsulation, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {TranslatePipe} from 'ng2-translate/ng2-translate';

import {MarkedService} from './base/marked/marked.service';

import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {AlertComponent} from './base/alert/alert.component';

import {IndexComponent} from './index/index.component';
import {ArticleListComponent} from './article/article-list.component';
import {ArticleDetailComponent} from './article/article-detail.component';
import {UserInfoComponent} from './user/user-info.component';

import {SignModalComponent} from './sign-modal/sign-modal.component';

import {ArticlCom} from './article/articl.com'; // test child router

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'root-app',
  template: require('./app.template.html'),
  styles: [
    require('../../config/icon.font.json'),
    require('./base/styles/global.less'),
    require('./article/article-list.less')
  ],
  pipes: [TranslatePipe],
  providers: [MarkedService],
  directives: [ROUTER_DIRECTIVES, NavbarComponent, FooterComponent, AlertComponent, SignModalComponent]
})
@RouteConfig([
  {path: '/', name: 'Index', component: IndexComponent, useAsDefault: true},
  {path: '/articl/...', name: 'Articl', component: ArticlCom}, // test child router
  {path: '/article/:category', name: 'ArticleList', component: ArticleListComponent},
  {path: '/article/:category/:url', name: 'ArticleDetail', component: ArticleDetailComponent},
  {path: '/account/info/:user', name: 'UserInfo', component: UserInfoComponent},

  {path: '/*path', redirectTo: ['Index']}
])
export class RootAppComponent implements OnInit {

  // onUserInfoUpdate(userInfo) {
  //   console.log('@output: ${userInfo}', userInfo);
  // }

  constructor() {}

  ngOnInit() {

  }

}
