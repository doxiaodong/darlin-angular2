import {
  Directive,
  OnInit
} from '@angular/core';

@Directive({
  selector: '[page-animate]',
  exportAs: 'pageAnimate'
})
export class PageAnimateDirective implements OnInit {
  stateExpression: string = 'page-enter';

  createAnimation: Function = () => {
    setTimeout(() => {
      this.stateExpression = 'page-enter-complete';
    }, 0);

  }

  constructor() {}

  ngOnInit() {
    this.createAnimation();
  }

}
