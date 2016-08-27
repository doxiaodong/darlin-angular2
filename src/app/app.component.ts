import {
  Component,
  ViewEncapsulation,
  OnInit
} from '@angular/core';

require('../../config/icon.font.json');
require('./base/styles/global.less');
require('./article/article-list.global.less');

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'root-app',
  templateUrl: './app.template.html',
  styles: [
    // require('../../config/icon.font.json'),
    // require('./base/styles/global.less'),
    // require('./article/article-list.less')
  ]
})
export class RootAppComponent implements OnInit {

  // onUserInfoUpdate(userInfo) {
  //   console.log('@output: ${userInfo}', userInfo);
  // }

  constructor() { }

  ngOnInit() {

  }

}
