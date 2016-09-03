import { Injectable } from '@angular/core'
import {
  CanActivate,
  Router
} from '@angular/router'
import { Observable } from 'rxjs/Observable'

import { UserService } from './user.service'
import { SignModalService } from '../sign-modal/sign-modal.service'

@Injectable()
export class SigninCheck implements CanActivate {
  constructor(private router: Router) { }
  canActivate() {

    return Observable.create((observer) => {
      UserService.get().then(() => {
        if (!UserService.isSignin()) {
          SignModalService.show()
          this.router.navigate(['/'])
          observer.next(false)
        } else {
          observer.next(true)
        }

        observer.complete()
      })
    })

  }
}
