import { AlertService } from 'app/declarations/alert/alert.service'

const fetchJsonp = require('fetch-jsonp')

export function jsonp(url, callbackname = 'callback') {
  const promise = fetchJsonp(url, {
    jsonpCallback: callbackname
  })
    .then(d => d.json())
    .then(res => {
      if (res.code === 0) {
        return res
      } else {
        Promise.reject(res)
      }
    }).catch(() => {
      AlertService.show('yqq api error')
    })

  return promise
}
