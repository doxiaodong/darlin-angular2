import {
  animate,
  state,
  style,
  transition,
  trigger,
  group
} from '@angular/core'

export function NgForAnimateFn() {
  return trigger('ngForAnimateTrigger', [
    state('in', style({transform: 'translate3d(0, 0, 0)', opacity: 1})),
    transition('void => *', [
      style({transform: 'translate3d(50px, 0, 0)', opacity: 0}),
      group([
        animate('0.3s ease', style({
          transform: 'translate3d(0, 0, 0)'
        })),
        animate('0.3s ease', style({
          opacity: 1
        }))
      ])
    ])
  ])
}
