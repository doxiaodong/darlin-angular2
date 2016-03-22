import {Component} from 'angular2/core';

@Component({
  selector: '[navbar]',
  template: require('./navbar.template.html'),
  styles: [
    require('./navbar.css'),
    require('./navbar.less')
  ]
})
export class NavbarComponent {
  public index = 0;
  constructor() {
  }
}
