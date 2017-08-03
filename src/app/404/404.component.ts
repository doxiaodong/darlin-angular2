import { Component } from '@angular/core'

import * as bg404 from '../../image-loader/404-bg.jpg'

@Component({
  selector: 'comp-404',
  templateUrl: './404.template.html',
  styleUrls: [
    './404.less'
  ]
})

export class Page404Component {
  public bg404: string = bg404
  constructor() { }
}
