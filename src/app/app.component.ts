import {
  Component,
  ViewEncapsulation
} from '@angular/core'

require('./base/styles/global.less')
require('./article/article-list.global.less')

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'root-app',
  templateUrl: './app.template.html',
  styles: [
    require('./base/styles/material.scss')
    // require('./base/styles/global.less'),
    // require('./article/article-list.less')
  ]
})
export class RootAppComponent {

  // onUserInfoUpdate(userInfo) {
  //   console.log('@output: ${userInfo}', userInfo)
  // }

  constructor() { }

}
