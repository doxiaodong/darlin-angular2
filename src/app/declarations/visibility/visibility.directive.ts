import {
  Directive,
  OnInit
} from '@angular/core'
import { Title } from '@angular/platform-browser'

import { LocalStorageService } from 'app/base/local-storage/local-storage.service'

@Directive({
  selector: '[dire-visibility]',
  inputs: [
    'w: dire-visibility'
  ],
  providers: [
    Title,
    LocalStorageService
  ]
})

export class VisibilityDirective implements OnInit {

  w: string

  constructor(
    private title: Title,
    local: LocalStorageService
  ) { }

  ngOnInit() {
    document.addEventListener('visibilitychange', () => {
      let state = document.visibilityState
      let title = this.title.getTitle()
      if (state === 'hidden') {
        LocalStorageService.saveSession('visibilityChangeTitle', title)
        this.title.setTitle(this.w)
      }
      if (state === 'visible') {
        this.title.setTitle(LocalStorageService.getSession('visibilityChangeTitle'))
        LocalStorageService.removeSession('visibilityChangeTitle')
      }
    })
  }

}
