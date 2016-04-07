import {Injectable} from 'angular2/core';

import {Utf8Service} from './utf8.service';

@Injectable()
export class Base64Service {

  encode(data: string) {
    var ac, b64, bits, enc, h1, h2, h3, h4, i, o1, o2, o3, tmp_arr;
    b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    o1 = void 0;
    o2 = void 0;
    o3 = void 0;
    h1 = void 0;
    h2 = void 0;
    h3 = void 0;
    h4 = void 0;
    bits = void 0;
    i = 0;
    ac = 0;
    enc = '';
    tmp_arr = [];
    if (!data) {
      return data;
    }
    data = this.utf8.encode(data + '');
    while (true) {
      o1 = data.charCodeAt(i++);
      o2 = data.charCodeAt(i++);
      o3 = data.charCodeAt(i++);
      bits = o1 << 16 | o2 << 8 | o3;
      h1 = bits >> 18 & 0x3f;
      h2 = bits >> 12 & 0x3f;
      h3 = bits >> 6 & 0x3f;
      h4 = bits & 0x3f;
      tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
      if (!(i < data.length)) {
        break;
      }
    }
    enc = tmp_arr.join('');
    switch (data.length % 3) {
      case 1:
        enc = enc.slice(0, -2) + '==';
        break;
      case 2:
        enc = enc.slice(0, -1) + '=';
    }
    return enc;
  }

  decode(input: string) {
    var b64, chr1, chr2, chr3, enc1, enc2, enc3, enc4, i, output;
    b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    output = "";
    chr1 = void 0;
    chr2 = void 0;
    chr3 = void 0;
    enc1 = void 0;
    enc2 = void 0;
    enc3 = void 0;
    enc4 = void 0;
    i = 0;
    if (!input) {
      return input;
    }
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
    while (i < input.length) {
      enc1 = b64.indexOf(input.charAt(i++));
      enc2 = b64.indexOf(input.charAt(i++));
      enc3 = b64.indexOf(input.charAt(i++));
      enc4 = b64.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 !== 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 !== 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    output = this.utf8.decode(output);
    return output;
  }

  constructor(
    private utf8: Utf8Service
  ) {
  }

}
