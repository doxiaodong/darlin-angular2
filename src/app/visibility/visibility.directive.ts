import {Directive, OnInit} from 'angular2/core';
import {Title} from 'angular2/platform/browser';

import {LocalStorageService} from '../base/local-storage/local-storage.service';

@Directive({
  selector: '[visibility]',
  inputs: [
    'w: visibility'
  ],
  providers: [Title, LocalStorageService]
})

export class VisibilityDirective implements OnInit {

  w: string;

  constructor(
    private title: Title,
    private local: LocalStorageService
  ) {}

  ngOnInit() {
    let _this = this;
    document.addEventListener('visibilitychange', function() {
      let state = this.visibilityState;
      let title = _this.title.getTitle();
      if (state === 'hidden') {
        LocalStorageService.saveSession('visibilityChangeTitle', title)
       _this.title.setTitle(_this.w);
      }
      if (state === 'visible') {
        _this.title.setTitle(LocalStorageService.getSession('visibilityChangeTitle'));
        LocalStorageService.removeSession('visibilityChangeTitle');
      }
    });
  }

}
