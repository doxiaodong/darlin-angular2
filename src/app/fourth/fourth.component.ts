import {Component} from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {TitleDirective} from '../title/title.directive';
import {PageAnimateDirective} from '../page-animate/page-animate.directive';
import {PageAnimateFn} from '../page-animate/page-animate';
import {LinksApi} from './links.api';

@Component({
  selector: 'links',
  templateUrl: './fourth.template.html',
  styles: [
    require('./fourth.less')
  ],
  pipes: [TranslatePipe],
  directives: [PageAnimateDirective, TitleDirective],
  animations: [
    PageAnimateFn()
  ]
})

export class FourthIndexComponent {

	public links: any[] = [];

  private getLinks() {
    LinksApi.getLinks()
    .then(data => {
      this.links = data.results;
    });
  }

  constructor() {
    this.getLinks();
  }

}
