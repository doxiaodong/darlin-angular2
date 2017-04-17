import { Subject } from 'rxjs/Subject'
import { UserInterface } from './user.interface'
import { USER_NULL } from './user.null'

import { BaseApi } from 'app/base/api/base.api'

class User {

  private _updateUser = new Subject<UserInterface>()
  private requestingUser: Promise<UserInterface>
  private hasGotUserInfoBefore: boolean = false
  updateUser$ = this._updateUser.asObservable()

  private userInfo: UserInterface = USER_NULL

  save(userInfo: UserInterface): UserInterface {
    if (!userInfo) {
      userInfo = USER_NULL
    }
    this.userInfo = userInfo
    this.updateSubject()

    return this.userInfo
  }

  get(): any {
    if (this.isSignin() || this.hasGotUserInfoBefore) {
      return Promise.resolve(this.userInfo)
    }
    if (this.requestingUser) {
      return this.requestingUser
    }

    this.requestingUser = this.getFromApi().then(userInfo => {
      this.requestingUser = null
      this.hasGotUserInfoBefore = true
      return Promise.resolve(this.userInfo)
    })

    return this.requestingUser

  }

  clear(): UserInterface {
    return this.save(USER_NULL)
  }

  getFromApi(): any {
    return BaseApi.overview()
      .then(userInfo => {
        this.save(userInfo.user)
        return Promise.resolve(this.userInfo)
      }).catch(() => {
        return Promise.resolve(this.userInfo)
      })
  }

  isSignin(): boolean {
    let u = this.userInfo
    if (!u || u.id === -1) {
      return false
    }
    return true
  }

  updateSubject(): void {
    this._updateUser.next(this.userInfo)
  }

}

export const UserService = new User()
