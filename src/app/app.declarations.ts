import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {AlertComponent} from './base/alert/alert.component';
import {SignModalComponent} from './sign-modal/sign-modal.component';
import {LoadingComponent} from './base/loading/loading.component';

import {VisibilityDirective} from './visibility/visibility.directive';

// ArticleModule
import {ArticleCategoryComponent} from './article/category.component';
import {CommentComponent} from './comment/comment.component';

export const components = [
  NavbarComponent,
  FooterComponent,
  AlertComponent,
  SignModalComponent,
  LoadingComponent,

  // ArticleModule
  ArticleCategoryComponent,
  CommentComponent
];

export const pipes = [
];

export const directives = [
  VisibilityDirective
];
