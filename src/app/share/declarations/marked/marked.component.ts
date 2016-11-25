import {
  Component,
  Input,
  ViewEncapsulation,
  OnChanges,
  ElementRef
} from '@angular/core'
import {
  DomSanitizer,
  SafeHtml
} from '@angular/platform-browser'

import { MarkedService } from './marked.service'

import * as emojione from 'emojione'

require('./markdown.global.less')
require('./tomorrow.night.global.css')
require('./highlight.number.global.less')
require('emojione/assets/css/emojione.min.css') // use node_modules

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'marked',

  // use ms(md) cause performance problem
  // use Onchanges to relace
  template: `
    <div [innerHTML]="html"></div>
  `,
  styles: [
    // require('./markdown.less'),
    // require('./tomorrow.night.css'),
    // require('./highlight.number.less')
  ],
  providers: [
    MarkedService
  ]
})

export class MarkedComponent implements OnChanges {

  @Input() md: string
  @Input() trust: boolean

  private ms: any

  public html: SafeHtml = ''

  updateJax() {
    if (global['MathJax']) {
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, this.ele.nativeElement])
    }
  }

  constructor(
    private sanitizer: DomSanitizer,
    private ele: ElementRef,
    markedService: MarkedService
  ) {

    this.ms = markedService.init()
    loadMathJax(this.updateJax.bind(this))

  }

  ngOnChanges(changes) {
    if (changes.md !== undefined && this.ms) {
      let emojiMd = emojione.toImage(this.md)
      if (this.trust) {
        this.html = this.sanitizer.bypassSecurityTrustHtml(this.ms(emojiMd))
      } else {
        this.html = this.ms(emojiMd)
      }
      setTimeout(() => {
        this.updateJax()
      }, 20)
    }
  }
}

function loadMathJax(callback) {
  if (global['MathJax']) {
    return
  }
  const script = document.createElement('script')
  script.src = 'https://cdn.tristana.cc/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-MML-AM_CHTML'
  const s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(script, s)
  script.addEventListener('load', callback)
}
