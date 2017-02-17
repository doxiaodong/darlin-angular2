import { AlertService } from 'app/declarations/alert/alert.service'
import * as fetchJsonp from 'fetch-jsonp'

export class DJsonp {
  get(url: string, callbackname = 'callback') {
    return fetchJsonp(url, {
      jsonpCallback: callbackname
    })
      .then((res: any) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(res)
      })
      .then(body => {
        if (body.code === 0) {
          return body
        }
        return Promise.reject(body)
      })
      .catch(() => {
        AlertService.show('jsonp error')
      })
  }
}
