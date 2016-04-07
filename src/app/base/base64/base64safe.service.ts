import {Injectable} from 'angular2/core';

import {Base64Service} from './base64.service';

@Injectable()
export class UrlSafeBase64Service {

  encode(v: string) {
    v = this.base64.encode(v);
    return v.replace(/\//g, '_').replace(/\+/g, '-');
  }

  decode(v: string) {
    if (typeof v !== 'string') {
      return null;
    }
    v = v.replace(/_/g, '/').replace(/\-/g, '+');
    return this.base64.decode(v);
  }

  constructor(
    private base64: Base64Service
  ) {
  }

}
