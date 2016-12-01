import {
  Component,
  OnInit,
  AfterViewInit,
  Injectable,
  ViewChild,
  ElementRef
} from '@angular/core'
import {
  Music
} from 'app/base/api/music.api'

@Component({
  selector: 'music',
  templateUrl: './music.template.html',
  styles: [
    require('./music.less')
  ],
  providers: [Music]
})
@Injectable()
export class MusicComponent implements OnInit, AfterViewInit {

  @ViewChild('audio') audio: ElementRef

  selectedSong = <any>{}

  show = false

  songs = []

  get songURL() {
    if (!this.selectedSong.id) {
      return ''
    }
    return `http://ws.stream.qqmusic.qq.com/${this.selectedSong.id}.m4a?fromtag=46`
  }

  select(song) {
    this.selectedSong = song
  }

  search(key: string) {
    if (!key) {
      return
    }
    return this.music.search(key)
      .then(songs => {
        this.songs = songs
      })
  }

  next() {
    let index
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

  constructor(private music: Music) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.audio.nativeElement.addEventListener('ended', () => {
      this.next()
    })
  }
}
