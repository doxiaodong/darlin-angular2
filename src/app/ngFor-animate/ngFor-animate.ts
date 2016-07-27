import {
  animate,
  state,
  style,
  transition,
  trigger,
  group
} from '@angular/core';

export function NgForAnimateFn() {
  let animate1: string = `0.3s ease`;
  // let animate2: string = `0.1s ease`;
  return trigger('ngForAnimateTrigger', [
    state('in', style({transform: 'translate3d(0, 0, 0)', opacity: 1})),
    transition('void => *', [
      style({transform: 'translate3d(50px, 0, 0)', opacity: 0}),
      group([
        animate(animate1, style({
          transform: 'translate3d(0, 0, 0)'
        })),
        animate(animate1, style({
          opacity: 1
        }))
      ])
    ])
    // transition('* => void', [
    //   group([
    //     animate(animate2, style({
    //       transform: 'translate3d(50px, 0, 0)'
    //     })),
    //     animate(animate2, style({
    //       opacity: 0
    //     }))
    //   ])
    // ])
  ]);
}
