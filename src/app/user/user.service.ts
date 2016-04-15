import {Subject}    from 'rxjs/Subject';

import {UserInterface} from './user.interface';
import {USER_NULL} from './user.null';

import {BaseApi} from '../base/api/base.api';


class User {

  private _updateUser = new Subject<UserInterface>();
  updateUser$ = this._updateUser.asObservable();

  private userInfo: UserInterface;

  save(userInfo: UserInterface) {

    this.userInfo = userInfo;
    this.updateSubject();

    return this.userInfo;
  }

  get(): UserInterface {
    this.getFromApi();
    return this.userInfo;
  }

  clear() {
    return this.save(USER_NULL);
  }

  getFromApi() {
    if (!this.userInfo || this.userInfo.id === -1) {

    }
  }

  updateSubject() {
    this._updateUser.next(this.userInfo);
  }

}

export var UserService = new User();
