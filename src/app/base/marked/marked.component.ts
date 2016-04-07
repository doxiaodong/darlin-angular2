import {Component, Input, ViewEncapsulation, OnChanges} from 'angular2/core';

import {MarkedService} from './marked.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'marked',

  // use ms(md) cause performance problem
  // use Onchanges to relace
  template: `
    <div [innerHTML]="html"></div>
  `,
  styles: [
    require('./markdown.less'),
    require('./tomorrow.night.css'),
    require('./highlight.number.less')
  ]
})

export class MarkedComponent implements OnChanges {

  @Input() md: string;

  private ms: any;

  public html: string = '';

  constructor(
    private markedService: MarkedService
  ) {

    this.ms = markedService.init();

  }

  ngOnChanges(changes) {
    console.log(changes);
    if (changes.md != undefined && this.ms) {
      this.html = this.ms(this.md);
    }
  }

}
