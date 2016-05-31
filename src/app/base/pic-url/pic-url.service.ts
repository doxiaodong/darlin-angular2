import {STATIC_URL_HOST, HEAD_PIC_STYLE, THIRD_PIC_REG} from '../constants/picture.constant';

export class PicUrl {

  static getUrl(pic: string): string {

    if (!THIRD_PIC_REG.test(pic)) {
      pic = STATIC_URL_HOST + pic + HEAD_PIC_STYLE;
    }

    return pic;
  }

}
