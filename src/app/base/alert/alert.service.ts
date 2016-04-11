import {Injectable} from 'angular2/core'
import {Subject}    from 'rxjs/Subject';

interface OptsInterface {
  title?: string;
  ok?: string;
}

export class AlertService {

  private _showAlert = new Subject<any>();
  showAlert$ = this._showAlert.asObservable();

  show(content: string, opts?: OptsInterface, callbackOk?: Function) {
    let _opts: any = {};

    if (typeof opts === 'function') {
      callbackOk = arguments[1];
    } else if (opts) {
      // console.log(_opts);
      _opts.title = opts.title;
      _opts.ok = opts.ok;
    }
    _opts.content = content;
    _opts.callback = callbackOk;
    this.updateSubject(_opts);

  }

  updateSubject(opts) {
    this._showAlert.next(opts);
  }

}
