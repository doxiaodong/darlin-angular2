import {HEAD_PIC_STYLE, THIRD_PIC_REG} from '../constants/picture.constant';

export class PicUrl {

  static reg: RegExp = new RegExp(THIRD_PIC_REG);

  static getUrl(pic: string): string {

    if (!this.reg.test(pic)) {
      pic = GLOBAL_VALUE.PIC_STATIC_URL_HOST + pic + HEAD_PIC_STYLE;
    } else {
      // change http to https
      pic = pic.replace(this.reg, 'https://');
    }

    return pic;
  }

}
