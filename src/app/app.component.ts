import {
  Component,
  ViewEncapsulation
} from '@angular/core'

require('./base/styles/global.less')
require('./article/list/article-list.global.less')

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'root-app',
  templateUrl: './app.template.html',
  styles: [
    require('./base/styles/material.scss')
  ]
})
export class RootAppComponent { }
