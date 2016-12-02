import { Subject } from 'rxjs/Subject'

export class ObservableService {
  private _subject = new Subject<any>()
  subject$ = this._subject.asObservable()

  static newObservable() {
    return new ObservableService()
  }

  next(value) {
    this._subject.next(value)
  }
}

export const ABObservableService = new ObservableService()
