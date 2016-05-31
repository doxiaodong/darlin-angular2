import {STATIC_URL_HOST, HEAD_PIC_STYLE, THIRD_PIC_REG} from '../constants/picture.constant';

export class PicUrl {

  static getUrl(pic: string): string {

    if (pic.slice(0, 4) != 'http') {
      pic = STATIC_URL_HOST + pic + HEAD_PIC_STYLE;
    }

    // if (!new RegExp(THIRD_PIC_REG).test(pic)) {
    //   pic = STATIC_URL_HOST + pic + HEAD_PIC_STYLE;
    // }

    return pic;
  }

}
