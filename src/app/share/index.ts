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
  JsonpModule
} from '@angular/http'
import { TranslateModule } from 'ng2-translate/ng2-translate'
import { MdRadioModule } from '@angular/material/radio'
import { MdUniqueSelectionDispatcher } from '@angular/material/core'
import { MdButtonModule } from '@angular/material/button'
import { IconModule } from './icon'
import { ClipModule } from 'ng2-clip'
import { SortablejsModule } from 'angular-sortablejs'

import {
  components,
  pipes,
  directives
} from './declarations'

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
    JsonpModule,
    MdRadioModule,
    IconModule,
    ClipModule,
    TranslateModule,
    SortablejsModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpModule,
    JsonpModule,
    MdRadioModule,
    MdButtonModule,
    IconModule,
    ClipModule,
    TranslateModule,
    SortablejsModule,

    ...components,
    ...pipes,
    ...directives
  ],
  providers: [
    MdUniqueSelectionDispatcher
  ]
})
export class ShareModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ShareModule,
      providers: []
    }
  }
}
