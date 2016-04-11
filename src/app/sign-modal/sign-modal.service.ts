import {Injectable} from 'angular2/core'
import {Subject}    from 'rxjs/Subject';

export class SignModalService {

  private _showSignModal = new Subject<any>();
  showSignModal$ = this._showSignModal.asObservable();

  show() {
    this.updateSubject();
  }

  updateSubject() {
    this._showSignModal.next(null);
  }

}
