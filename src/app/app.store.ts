import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Injectable } from '@angular/core'
import 'rxjs/add/operator/distinctUntilChanged'

export interface State {
  // define your state here
}

const defaultState: State = {
  // define your initial state here
}

const _store = new BehaviorSubject<State>(defaultState)

@Injectable()
export class AppStore {
  private _store = _store
  changes = this._store
    .asObservable()
    .distinctUntilChanged()

  setState(state: State) {
    this._store.next(state)
  }

  getState(): State {
    return this._store.value
  }

  purge() {
    this._store.next(defaultState)
  }
}
