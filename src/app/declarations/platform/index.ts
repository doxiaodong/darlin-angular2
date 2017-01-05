import {
  Directive,
  OnInit
} from '@angular/core'

@Directive({
  selector: '[dire-platform]'
})

export class PlatformDirective implements OnInit {

  platform: any

  constructor() { }

  ngOnInit() {
    const htmlDom = document.getElementsByTagName('html')[0]
    const ua = window.navigator.userAgent

    this.platform = {
      mobile: ua.match(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile/i)
      && ua.match(/Mobile/i) !== null,
      ipad: ua.match(/ipad/i) !== null,
      iphone: ua.match(/iphone/i) !== null,
      android: ua.match(/android/i) !== null,
      webkit: ua.match(/webkit/gi) !== null,
      touch: ('ontouchstart' in window),

      standalone: window.navigator['standalone']
    }

    this.platform.ios = this.platform.ipad || this.platform.iphone
    this.platform.ios7 = this.platform.ios && ua.match(/os 7/i) !== null
    this.platform.ios8 = this.platform.ios && ua.match(/os 8/i) !== null
    this.platform.ios9 = this.platform.ios && ua.match(/os 9/i) !== null
    this.platform.ios10 = this.platform.ios && ua.match(/os 10/i) !== null

    Object.keys(this.platform).forEach((key) => {
      if (this.platform[key]) {
        htmlDom.classList.add(key)
      }
    })
  }

}
