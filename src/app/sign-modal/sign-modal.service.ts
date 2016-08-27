import {Subject} from 'rxjs/Subject';

class SignModal {

  private _showSignModal = new Subject<any>();
  showSignModal$ = this._showSignModal.asObservable();

  show() {
    this.updateSubject();
  }

  updateSubject() {
    this._showSignModal.next(null);
  }

}

export const SignModalService = new SignModal();
