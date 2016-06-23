import {
  // animate,
  state,
  style,
  // transition,
  trigger
} from '@angular/core';

export function PageAnimateFn() {
  return trigger('pageAnimateTrigger', [
    state('page-enter', style({
      opacity: 0,
      transform: 'translate3d(0, 100px, 0)',
      transition: '300ms cubic-bezier(.17, .67, .88, .1)'
    })),
    state('page-enter-complete', style({
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
      transition: '300ms cubic-bezier(.17, .67, .88, .1)'
    }))
    // transition(
    //   'page-enter <=> page-enter-complete',
    //   animate('300ms cubic-bezier(.17, .67, .88, .1)')
    // )
  ]);
}
