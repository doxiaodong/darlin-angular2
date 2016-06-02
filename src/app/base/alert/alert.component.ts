import {
  Component,
  Input,
  OnInit,
  OnChanges
} from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';

import {AlertService} from './alert.service';

interface AlertInterface {
  title: string;
  ok: string;
  content: string;
  callback: Function;
}

@Component({
  selector: '[alert]',
  template: require('./alert.template.html'),
  styles: [
    require('./alert.less')
  ],
  pipes: [TranslatePipe]
})

export class AlertComponent implements OnInit, OnChanges {

  public opts: AlertInterface;
  public showAlert: boolean = false;

  @Input() alertTitle: string;
  @Input() alertOk: string;

  closeAlert() {
    this.showAlert = false;
    if (this.opts.callback) {
      this.opts.callback();
    }
  }

  constructor() {
  }

  ngOnInit() {

    AlertService.showAlert$.subscribe(_opts => {
      this.opts = {
        title: _opts.title ? _opts.title : this.alertTitle,
        ok: _opts.ok ? _opts.ok : this.alertOk,
        content: _opts.content,
        callback: _opts.callback
      };
      if (!this.opts.title) {
        this.opts.title = 'Alert';
      }
      if (!this.opts.ok) {
        this.opts.ok = 'Ok';
      }
      this.showAlert = true;
    });

  }

  ngOnChanges(changes) {
    // console.log(changes);
  }

}
