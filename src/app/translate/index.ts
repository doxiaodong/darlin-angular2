import { Subject } from 'rxjs/Subject'

class Translate {
  private _updateTranslate = new Subject<string>()
  updateTranslate$ = this._updateTranslate.asObservable()
  lang: string

  updateSubject(lang: string): void {
    this._updateTranslate.next(lang)
  }
  setLang(lang: string): void {
    this.lang = lang
    this.updateSubject(this.lang)
  }

}

export const AbTranslateService = new Translate()
