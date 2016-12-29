import { Injectable } from '@angular/core'
import API_PREFIX from 'app/base/api-prefix/api-prefix.service'
import {
  URLSearchParams,
  Http
} from '@angular/http'
import { jsonp } from 'app/base/fetch'
import { unescapeHTML } from 'app/base/utils/unescape-html'

@Injectable()
export class Music {

  search(key: string) {
    const params = new URLSearchParams()
    params.set('key', key)
    return jsonp('https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg?' + params, 'jsonpCallback')
      .then(res => {
        const song = res.data.song
        if (!song) {
          return []
        }
        return song.itemlist || []
      })
  }

  getHotKey() {
    return jsonp('https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg', 'jsonpCallback')
      .then(res => {
        const keys = res.data.hotkey
        const randomKey = Math.floor(10 * Math.random())
        return keys[randomKey].k
      })
  }

  getLyric(id) {
    const params = new URLSearchParams()
    params.set('showapi_appid', '26601')
    params.set('showapi_sign', 'adc05e2062a5402b81c563a3ced09208')
    params.set('musicid', id)
    return this.http.get('https://route.showapi.com/213-2?' + params)
      .toPromise()
      .then(res => {
        if (res.ok) {
          const lyric = res.json().showapi_res_body.lyric
          return unescapeHTML(lyric)
        }
      }).catch((err) => {
        console.error(err)
        return null
      })
  }

  getLyricProxy(id) {
    if (!id) {
      return
    }
    return jsonp(`${API_PREFIX}/music/lyric/${id}/`, 'callback')
      .then(res => {
        const lyric = res.lyric
        return base64.Base64.decode(lyric)
      }).catch((err) => {
        console.error(err)
        return null
      })
  }

  constructor(private http: Http) { }
}
