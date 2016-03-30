import {Injectable} from 'angular2/core'
import {Subject}    from 'rxjs/Subject';

import {UserInterface} from './user.interface';
import {USER_NULL} from './user.null';


@Injectable()
export class UserService {

  private _updateUser = new Subject<UserInterface>();
  updateUser$ = this._updateUser.asObservable();

  private userInfo: UserInterface;

  save(userInfo: UserInterface) {
    this.userInfo = userInfo;
    this.updateSubject();

    return this.userInfo;
  }

  get(): UserInterface {
    return this.userInfo;
  }

  clear() {
    return this.save(USER_NULL);
  }

  updateSubject() {
    this._updateUser.next(this.userInfo);
  }

}
