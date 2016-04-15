import {BrowserXhr} from 'angular2/http';

export class CustomBrowserXhr extends BrowserXhr {
  build(): any {
    let xhr = super.build();
    xhr.withCredentials = true;
    return <any>(xhr);
  }
}
