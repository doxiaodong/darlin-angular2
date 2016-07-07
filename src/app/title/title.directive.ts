import {
  Directive,
  OnChanges
} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Directive({
  selector: '[title]',
  inputs: [
    't: title'
  ],
  providers: [Title]
})

export class TitleDirective implements OnChanges {

  t: string;

  constructor(
    private title: Title
  ) { }

  ngOnChanges(changes) {
    if (changes.t) {
      this.title.setTitle(changes.t.currentValue);
    }
  }

}
