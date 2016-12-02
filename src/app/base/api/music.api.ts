import { Injectable } from '@angular/core'
import { URLSearchParams } from '@angular/http'
import { jsonp } from 'app/base/fetch'

@Injectable()
export class Music {

  search(key: string) {
    const params = new URLSearchParams()
    params.set('key', key)
    return jsonp('https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg?' + params, 'jsonpCallback')
      .then(data => {
        const song = data.song
        if (!song) {
          return []
        }
        return song.itemlist || []
      })
  }

  getHotKey() {
    return jsonp('https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg', 'jsonpCallback')
      .then(data => {
        const keys = data.hotkey
        const randomKey = Math.floor(10 * Math.random())
        return keys[randomKey].k
      })
  }
}
