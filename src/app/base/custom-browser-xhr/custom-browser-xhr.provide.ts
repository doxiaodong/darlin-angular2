import {Injectable} from 'angular2/core';

import {BrowserXhr} from 'angular2/http';


@Injectable()
export class CustomBrowserXhr extends BrowserXhr {
  build(): any {
    let xhr = super.build();
    xhr.withCredentials = true;
    return <any>(xhr);
  }
}