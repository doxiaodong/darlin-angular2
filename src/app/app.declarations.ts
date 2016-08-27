import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {AlertComponent} from './base/alert/alert.component';
import {SignModalComponent} from './sign-modal/sign-modal.component';
import {LoadingComponent} from './base/loading/loading.component';

import {VisibilityDirective} from './visibility/visibility.directive';

export const components = [
  NavbarComponent,
  FooterComponent,
  AlertComponent,
  SignModalComponent,
  LoadingComponent
];

export const pipes = [
];

export const directives = [
  VisibilityDirective
];
