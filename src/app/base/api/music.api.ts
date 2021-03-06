import { Injectable } from '@angular/core'
import API_PREFIX from 'app/base/api-prefix/api-prefix.service'
import { URLSearchParams } from '@angular/http'
import { DJsonp } from 'app/base/fetch'

@Injectable()
export class Music {

  search(key: string) {
    const params = new URLSearchParams()
    params.set('key', key)
    return this.djsonp.get(
      'https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg?' + params,
      'jsonpCallback'
    ).then(res => {
      const song = res.data.song
      if (!song) {
        return []
      }
      return song.itemlist || []
    })
  }

  // getAddress({mid, id}) {
  //   const params = new URLSearchParams()
  //   params.set('songmid', mid)
  //   params.set('format', 'jsonp')
  //   return this.djsonp.get(
  //     'https://c.y.qq.com/v8/fcg-bin/fcg_play_single_song.fcg?' + params,
  //     'callback'
  //   ).then(res => {
  //     const url = res.url && res.url[id]
  //     return url.replace('ws.stream.qqmusic.qq.com', 'https://dl.stream.qqmusic.qq.com')
  //   })
  // }

  getHotKey() {
    return this.djsonp.get('https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg', 'jsonpCallback')
      .then(res => {
        const keys = res.data.hotkey
        const randomKey = Math.floor(10 * Math.random())
        return keys[randomKey].k
      })
  }

  getLyricProxy(id) {
    if (!id) {
      return
    }
    return this.djsonp.get(`${API_PREFIX}/music/lyric/${id}/`, 'callback')
      .then(res => {
        const lyric = res.lyric
        return base64.Base64.decode(lyric)
      })
  }

  constructor(private djsonp: DJsonp) { }
}
