import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {FullScreenDirective} from '../full-screen/full-screen.directive';

@Component({
  selector: 'notfound',
  templateUrl: './404.template.html',
  styles: [
    require('./404.less')
  ],
  pipes: [TranslatePipe],
  directives: [ROUTER_DIRECTIVES, FullScreenDirective]
})

export class Page404Component {
  public bg404: string = require('image-loader/404-bg.jpg');
  constructor() {

  }
}
