import {
  Component,
  OnInit,
  AfterViewInit,
  Injectable,
  ViewChild,
  ElementRef
} from '@angular/core'
import { Music } from 'app/base/api/music.api'
import { darlinDB } from 'app/base/indexdb'
import { ObservableService } from 'app/base/observable'
import {
  Delete,
  Play,
  Add,
  Sort
} from 'app/share/icon'

import * as LrcJs from 'app/lrc.js'
const Lrc = LrcJs.Lrc

// const Lrc = require('app/lrc.js').Lrc

@Component({
  selector: 'comp-music',
  templateUrl: './music.template.html',
  styleUrls: [
    './music.less'
  ],
  providers: [
    Music
  ]
})
@Injectable()
export class MusicComponent implements OnInit, AfterViewInit {

  @ViewChild('audio') audio: ElementRef

  public icon = {
    delete: Delete,
    play: Play,
    add: Add,
    sort: Sort
  }

  searchObserable: ObservableService

  key: string
  selectedSong = <any>{}
  show = false
  songs = []
  searchSongs = []

  currentLyric: string

  lrc
  playMode: 'normal' | 'random' = 'normal'

  get isRandomMode() {
    return this.playMode === 'random'
  }

  sortableOption = {
    animation: 250,
    handle: '.sortable-handle',
    onSort: (e) => {
      this.updateIndexDBSongs()
    }
  }

  trackByFn(index, item) {
    return item.id
  }

  // call this when songs update
  updateIndexDBSongs() {
    darlinDB.updateSongs(this.songs)
  }

  addToSongs(song) {
    if (this.songs.some((s) => s.id === song.id)) {
      console.warn('已在列表中')
      return
    }
    this.songs.push(song)

    // darlinDB.addSong(song)
    this.updateIndexDBSongs()
    // add song to indexDB
  }

  removeSong(song, event) {
    if (song.id === this.selectedSong.id) {
      this.next()
    }

    this.songs = this.songs.filter((s) => s.id !== song.id)
    if (this.songs.length === 0) {
      this.selectedSong = {}
    }

    // darlinDB.removeSong(song)
    this.updateIndexDBSongs()
    // remove song from indexDB
    event.stopPropagation()
  }

  playInsearch(song) {
    this.addToSongs(song)
    this.select(song)
  }

  get songURL() {
    if (!this.selectedSong.id) {
      return ''
    }
    // return `http://ws.stream.qqmusic.qq.com/${this.selectedSong.id}.m4a?fromtag=46`
    return `https://music.tristana.cc/${this.selectedSong.id}.m4a?fromtag=46`
  }

  clickSelect(song) {
    if (this.selectedSong.id === song.id) {
      return
    }
    this.select(song)
  }

  select(song) {
    if (this.lrc) {
      this.lrc.stop()
      this.lrc = null
    }
    this.getLyric(song.id)
      .then(() => {
        this.currentLyric = ''
        this.selectedSong = song

        if (this.selectedSong.id) {
          const audio = this.audio.nativeElement
          audio.src = this.songURL
          // audio.play() // ios auto play()
        }
      })
  }

  search(key: string) {
    if (!key) {
      return
    }
    this.searchObserable.next(key)
  }

  getHotKey() {
    this.music.getHotKey()
      .then(key => {
        this.key = key
        this.search(key)
      })
  }

  lrcOutputFn(line) {
    this.currentLyric = line
  }

  getLyric(id) {
    return this.music.getLyricProxy(id)
      .then(lyric => {
        if (!lyric) {
          return
        }
        return this.lrc = new Lrc(lyric, this.lrcOutputFn.bind(this))
      })
  }

  next() {
    let index = -1
    let toSelect
    const len = this.songs.length

    if (this.playMode === 'normal') {
      this.songs.forEach((song, i) => {
        if (song.id === this.selectedSong.id) {
          index = i
        }
      })
      if (index + 1 < len) {
        toSelect = index + 1
      } else {
        toSelect = 0
      }
    }

    if (this.playMode === 'random') {
      toSelect = Math.floor(len * Math.random())
    }
    this.select(this.songs[toSelect])
  }

  lyricPlay(audio) {
    const currentTime = audio['currentTime']
    this.lrc.play()
    this.lrc.seek(currentTime * 1000)
  }

  constructor(
    private music: Music
  ) {
    this.searchObserable = ObservableService.newObservable()
  }

  ngOnInit() {
    // get songs from indexDB
    darlinDB.getSongs$.subscribe(songs => {
      this.songs = songs
    })

    darlinDB.initDB$.subscribe(db => {
      darlinDB.getSongs()
    })

    darlinDB.initDB()

    this.searchObserable.subject$.debounceTime(300).distinctUntilChanged().subscribe(key => {
      this.music.search(key)
        .then(songs => {
          this.searchSongs = songs
        })
    })

    this.getHotKey()
  }

  ngAfterViewInit() {
    const audio = this.audio.nativeElement

    audio.addEventListener('canplaythrough', () => {
      audio.play()
    })

    audio.addEventListener('ended', () => {
      this.next()
    })

    audio.addEventListener('pause', () => {
      this.lrc.pause()
    })

    // audio.addEventListener('progress', () => {
    //   audio.pause()
    // })

    audio.addEventListener('play', () => {
      this.lyricPlay(audio)
    })
  }
}
