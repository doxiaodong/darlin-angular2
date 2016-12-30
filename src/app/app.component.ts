import {
  Component,
  ViewEncapsulation
} from '@angular/core'

import './base/styles/global.less'
import './article/list/article-list.global.less'
import './base/styles/material.global.scss'

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'root-app',
  templateUrl: './app.template.html'
})
export class RootAppComponent { }
