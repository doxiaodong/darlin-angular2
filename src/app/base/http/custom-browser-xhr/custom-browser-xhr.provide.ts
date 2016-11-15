import { BrowserXhr } from '@angular/http'

export class CustomBrowserXhr extends BrowserXhr {
  build(): any {
    let xhr = super.build()
    xhr.withCredentials = true
    return <any>(xhr)
  }
}
