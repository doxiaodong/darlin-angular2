import {
  Directive,
  OnInit,
  OnDestroy,
  ElementRef
} from '@angular/core'

@Directive({
  selector: '[full-screen]',
  exportAs: 'fullScreen'
})

export class FullScreenDirective implements OnInit, OnDestroy {

  public followWidth: boolean = true

  resizeFn: any

  resize() {
    let windowHeight = window.innerHeight
    let windowWidth = window.innerWidth
    let elementHeight = this.element.nativeElement.height
    let elementWidth = this.element.nativeElement.width

    if (elementWidth / windowWidth * windowHeight < elementHeight) {
      this.followWidth = true
    } else {
      this.followWidth = false
    }

  }

  constructor(
    private element: ElementRef
  ) {}

  ngOnInit() {
    this.element.nativeElement.addEventListener('load', () => {
      this.resize()
    })

    window.addEventListener('resize', this.resizeFn = () => {
      this.resize()
    })
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeFn)
  }

}
