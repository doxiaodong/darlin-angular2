import {
  HEAD_PIC_STYLE,
  THIRD_PIC_REG
} from './picture.constant'
const md5 = require('crypto-js/md5')

export class PicUrl {

  static reg: RegExp = new RegExp(THIRD_PIC_REG)

  static getUrl(pic: string, email?: string): string {
    if (pic === 'none') {
      // pic = 'static/assets/images/head/head.png'
      pic = `https://s.gravatar.com/avatar/${md5(email).toString()}?s=100`
    } else if (!this.reg.test(pic)) {
      pic = GLOBAL_VALUE.PIC_STATIC_URL_HOST + pic + HEAD_PIC_STYLE
    } else {
      // change http to https
      pic = pic.replace(this.reg, 'https://')
    }

    return pic
  }

}
