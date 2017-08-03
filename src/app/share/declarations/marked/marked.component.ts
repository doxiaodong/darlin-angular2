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

import './markdown.global.less'
import './tomorrow.night.global.css'
import './highlight.number.global.less'
import 'emojione/extras/css/emojione.min.css' // use node_modules

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'comp-marked',

  // use ms(md) cause performance problem
  // use Onchanges to relace
  template: `
    <div [innerHTML]="html"></div>
  `,
  styleUrls: [
    // './markdown.less',
    // './tomorrow.night.css',
    // './highlight.number.less'
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
  script.src = 'https://cdn.bootcss.com/mathjax/2.7.1/MathJax.js?config=TeX-MML-AM_CHTML'
  const s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(script, s)
  script.addEventListener('load', callback)
}
