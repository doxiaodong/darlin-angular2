import {Component} from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {TitleDirective} from '../title/title.directive';
import {PageAnimateDirective} from '../page-animate/page-animate.directive';
import {PageAnimateFn} from '../page-animate/page-animate';
import {LinksApi} from './links.api';
import {
  // Control,
  ControlGroup,
  FormBuilder,
  Validators
} from '@angular/common';

const sha512 = require('crypto-js/sha512');
const md5 = require('crypto-js/md5');

interface IGenpassword {
  initPassword: string;
  key: string;
  output: string;
  output15: string;
}

@Component({
  selector: 'links',
  templateUrl: './fourth.template.html',
  styles: [
    require('./fourth.less')
  ],
  pipes: [TranslatePipe],
  directives: [PageAnimateDirective, TitleDirective],
  animations: [
    PageAnimateFn()
  ]
})

export class FourthIndexComponent {
  genPasswordForm: ControlGroup;

  public gen: IGenpassword = {
    initPassword: '',
    key: '',
    output: '',
    output15: ''
  };

  public links: any[] = [];

  private getLinks() {
    LinksApi.getLinks()
      .then(data => {
        this.links = data.results;
      });
  }

  public resetGenPassword() {
    this.gen.output = '';
    this.gen.output15 = '';
  }

  public genPasswordFn(): void {
    let pString: string = sha512(this.gen.initPassword).toString();
    let kString: string = sha512(this.gen.key);
    let shaString: string = sha512(pString + kString).toString();
    this.gen.output = md5(shaString).toString();
    this.gen.output15 = this.gen.output.slice(0, 14);
  }

  constructor(
    private fb: FormBuilder
  ) {
    this.getLinks();

    this.genPasswordForm = fb.group({
      initPassword: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      key: [
        '',
        Validators.compose([
        ])
      ]
    });
  }

}
