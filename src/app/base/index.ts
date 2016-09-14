import {
  NgModule,
  ModuleWithProviders
} from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms'
import {
  HttpModule,
  Http
} from '@angular/http'
import {
  TranslateModule,
  TranslateLoader,
  TranslateStaticLoader
} from 'ng2-translate/ng2-translate'
import {
  MdRadioModule,
  MdUniqueSelectionDispatcher
} from '@angular2-material/radio/radio'
import { MdButtonModule } from '@angular2-material/button/button'
// import { MdListModule } from '@angular2-material/list/list'

import {
  components,
  pipes,
  directives
} from './base.declarations'

@NgModule({
  declarations: [
    ...components,
    ...pipes,
    ...directives
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpModule,
    MdRadioModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
      deps: [Http]
    })
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpModule,
    MdRadioModule,
    MdButtonModule,
    // MdListModule,
    TranslateModule,

    ...components,
    ...pipes,
    ...directives
  ],
  providers: [
    MdUniqueSelectionDispatcher
  ]
})
export class BaseModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BaseModule,
      providers: [
      ]
    }
  }
}
