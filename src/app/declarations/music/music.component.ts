import {
  Component,
  OnInit,
  OnDestroy,
  Injectable
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
export class MusicComponent implements OnInit, OnDestroy {

  selectedID = null

  show = false

  songs = []

  get songURL() {
    return `http://ws.stream.qqmusic.qq.com/${this.selectedID}.m4a?fromtag=46`
  }

  select(song) {
    this.selectedID = song.id
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

  closeSelector() {
    this.show = false
  }

  clickEvent() {
    document.addEventListener('click', this.closeSelector)
  }

  constructor(private music: Music) { }

  ngOnInit() {
    this.clickEvent()
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.closeSelector)
  }
}
