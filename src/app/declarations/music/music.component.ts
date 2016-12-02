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
  Add
} from 'app/share/icon'

const Lrc = require('app/lrc.js').Lrc

@Component({
  selector: 'music',
  templateUrl: './music.template.html',
  styles: [
    require('./music.less')
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
    add: Add
  }

  searchObserable: ObservableService

  key: string
  selectedSong = <any>{}
  show = false
  songs = []
  searchSongs = []

  currentLyric: string

  lrc

  trackByFn(index, item) {
    return item.id
  }

  addToSongs(song) {
    if (this.songs.filter((s) => s.id === song.id).length > 0) {
      console.warn('已在列表中')
      return
    }
    this.songs.push(song)
    darlinDB.addSong(song)
    // add song to indexDB
  }

  removeSong(song, event) {
    if (song.id === this.selectedSong.id) {
      this.next()
    }

    darlinDB.removeSong(song)
    this.songs = this.songs.filter((s) => s.id !== song.id)
    if (this.songs.length === 0) {
      this.selectedSong = {}
    }
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
    return `http://ws.stream.qqmusic.qq.com/${this.selectedSong.id}.m4a?fromtag=46`
  }

  select(song) {
    if (this.selectedSong.id === song.id) {
      return
    }
    if (this.lrc) {
      this.lrc.stop()
    }
    this.getLyric(song.id)
      .then(() => {
        this.selectedSong = song
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
    return this.music.getLyric(id)
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
    this.select(this.songs[toSelect])
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

    audio.addEventListener('ended', () => {
      this.next()
    })

    audio.addEventListener('pause', () => {
      this.lrc.pauseToggle()
    })

    audio.addEventListener('play', () => {
      const currentTime = audio['currentTime']
      this.lrc.play()
      this.lrc.seek(currentTime * 1000)
    })
  }
}
