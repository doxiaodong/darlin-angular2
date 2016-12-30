import { Component } from '@angular/core'

@Component({
  selector: 'notfound',
  templateUrl: './404.template.html',
  styleUrls: [
    './404.less'
  ]
})

export class Page404Component {
  public bg404: string = require('../../image-loader/404-bg.jpg')
  constructor() { }
}
