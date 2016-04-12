import {Directive, ElementRef, OnInit} from 'angular2/core';
import {Animation, AnimationBuilder} from 'angular2/animate';

@Directive({
  selector: '[page-animate]',
  exportAs: 'pageAnimate'
})
export class PageAnimateDirective implements OnInit {
  createAnimation: Function = () => {
    let a = this._ab.css();
    a.addAnimationClass('page-enter');
    a.setDuration(1000);
    a.setFromStyles({
      opacity: 0,
      transform: 'translate3d(0, 100px, 0)'
    })
    .setToStyles({
      opacity: 1,
      transform: 'translate3d(0, 0, 0)'
    });

    let _a = a.start(this._e.nativeElement);
    _a.onComplete(() => {
      a.removeClass('page-enter');
      console.log(this._e.nativeElement)
      this._e.nativeElement.removeAttribute('style'); // Do not write inline styles in html
    });

  }

  constructor(
    private _ab: AnimationBuilder,
    private _e: ElementRef
  ) {}

  ngOnInit() {
    this.createAnimation();
  }

}
