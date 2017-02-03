import { Injectable } from '@angular/core'
import { Jsonp } from '@angular/http'
import { AlertService } from 'app/declarations/alert/alert.service'

@Injectable()
export class DJsonp {
  get(url: string, callbackname = 'callback') {
    const u = url + (url.indexOf('?') === -1 ? '?' : '&')
    return this.jsonp.get(u + callbackname + '=JSONP_CALLBACK')
    .toPromise()
    .then(res => {
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

  constructor(private jsonp: Jsonp) {}
 }
