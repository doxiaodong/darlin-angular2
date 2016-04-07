import {Component} from 'angular2/core';
import {TranslateService, TranslatePipe, LangChangeEvent} from 'ng2-translate/ng2-translate';

import {LanguageInterface} from './language.interface';
import {LocalStorageService} from '../base/local-storage/local-storage.service';

@Component({
  selector: '[footer]',
  template: require('./footer.template.html'),
  styles: [
    require('./footer.less')
  ],
  pipes: [TranslatePipe]
})

export class FooterComponent {

  public langs: Array<LanguageInterface>;

  public show: boolean = false;

  public selectedKey: string

  translateInit() {
    this.local.setPrefix('xd.');
    let current = this.local.get('language');
    if (current == undefined) {
      current = 'zh_CN';
    }
    this.translate.use(current);
    this.local.save('language', current);
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.local.save('language', event.lang);
    });
  }

  changeLanguage(lang: LanguageInterface) {
    this.selectedKey = lang.key;
    this.translate.use(this.selectedKey);
    this.show = false;
  }

  clickEvent() {
    document.addEventListener('click', () => {
      this.show = false;
    });
  }

  constructor(
    private translate: TranslateService,
    private local: LocalStorageService
  ) {

    this.translateInit();

    this.selectedKey = local.get('language');

    this.langs = [{
      key: 'zh_CN',
      word: '中文'
    }, {
      key: 'en_US',
      word: 'English'
    }];

    this.clickEvent();
  }

}
