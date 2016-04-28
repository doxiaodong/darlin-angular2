import {Component} from 'angular2/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {TitleDirective} from '../title/title.directive';
import {PageAnimateDirective} from '../page-animate/page-animate.directive';

@Component({
  template: require('./fourth.template.html'),
  styles: [
    require('./fourth.less')
  ],
  pipes: [TranslatePipe],
  directives: [PageAnimateDirective, TitleDirective]
})

export class FourthIndexComponent {

	public links: any[] = [{
		title: '大海碎碎念',
		url: 'http://hiepsilon.com',
    type: 'blog'
	}];

  constructor() {}

}