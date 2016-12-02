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
}
