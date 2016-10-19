import {
  NgModule,
  ModuleWithProviders
} from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms'
import { HttpModule } from '@angular/http'
import { TranslateModule } from 'ng2-translate/ng2-translate'
import { MdRadioModule } from '@angular/material/radio'
import { MdUniqueSelectionDispatcher } from '@angular/material/core'
import { MdButtonModule } from '@angular/material/button'
import { IconModule } from './icon'
import { ClipModule } from 'ng2-clip'

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
    IconModule,
    ClipModule,
    TranslateModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpModule,
    MdRadioModule,
    MdButtonModule,
    IconModule,
    ClipModule,
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
      providers: []
    }
  }
}
