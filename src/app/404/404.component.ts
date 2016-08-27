import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {TitleDirective} from '../title/title.directive';
import {FullScreenDirective} from '../full-screen/full-screen.directive';

@Component({
  selector: 'notfound',
  templateUrl: './404.template.html',
  styles: [
    require('./404.less')
  ],
  directives: [ROUTER_DIRECTIVES, FullScreenDirective, TitleDirective]
})

export class Page404Component {
  public bg404: string = require('image-loader/404-bg.jpg');
  constructor() {

  }
}
