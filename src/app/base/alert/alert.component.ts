import {
  Component,
  Input,
  OnInit
} from '@angular/core'

import { AlertService } from './alert.service'
import { Close } from '../icon'

interface AlertInterface {
  title: string
  ok: string
  content: string
  callback: Function
}

@Component({
  selector: '[alert]',
  templateUrl: './alert.template.html',
  styles: [
    require('./alert.less')
  ]
})

export class AlertComponent implements OnInit {

  public opts: AlertInterface
  public showAlert: boolean = false
  public icon = {
    close: Close
  }

  @Input() alertTitle: string
  @Input() alertOk: string

  closeAlert() {
    this.showAlert = false
    if (this.opts.callback) {
      this.opts.callback()
    }
  }

  ngOnInit() {

    AlertService.showAlert$.subscribe(_opts => {
      this.opts = {
        title: _opts.title ? _opts.title : this.alertTitle,
        ok: _opts.ok ? _opts.ok : this.alertOk,
        content: _opts.content,
        callback: _opts.callback
      }
      if (!this.opts.title) {
        this.opts.title = 'Alert'
      }
      if (!this.opts.ok) {
        this.opts.ok = 'Ok'
      }
      this.showAlert = true
    })

  }

}
