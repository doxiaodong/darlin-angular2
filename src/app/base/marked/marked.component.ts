import {Component, Input, ViewEncapsulation} from 'angular2/core';

import {MarkedService} from './marked.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'marked',
  template: `
    <div [innerHTML]="ms(md)"></div>
  `,
  styles: [
    require('./markdown.less'),
    require('./tomorrow.night.css'),
    require('./highlight.number.less'),
  ]
})

export class MarkedComponent {

  @Input() md: string;

  public ms: any;

  constructor(ms: MarkedService) {

    this.ms = ms.init();

  }

}
