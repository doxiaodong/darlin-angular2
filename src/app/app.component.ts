import {
  Component,
  ViewEncapsulation,
  OnInit
} from '@angular/core';
import {
  ROUTER_DIRECTIVES
} from '@angular/router';
import {TranslatePipe} from 'ng2-translate/ng2-translate';

import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {AlertComponent} from './base/alert/alert.component';
import {SignModalComponent} from './sign-modal/sign-modal.component';
import {LoadingComponent} from './base/loading/loading.component';
import {VisibilityDirective} from './visibility/visibility.directive';

require('../../config/icon.font.json');
require('./base/styles/global.less');
require('./article/article-list.global.less');

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'root-app',
  templateUrl: './app.template.html',
  styles: [
    // require('../../config/icon.font.json'),
    // require('./base/styles/global.less'),
    // require('./article/article-list.less')
  ],
  pipes: [TranslatePipe],
  directives: [
    ROUTER_DIRECTIVES,
    NavbarComponent,
    FooterComponent,
    AlertComponent,
    SignModalComponent,
    LoadingComponent,
    VisibilityDirective
  ]
})
export class RootAppComponent implements OnInit {

  // onUserInfoUpdate(userInfo) {
  //   console.log('@output: ${userInfo}', userInfo);
  // }

  constructor() { }

  ngOnInit() {

  }

}
