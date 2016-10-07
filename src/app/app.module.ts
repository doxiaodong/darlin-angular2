import { NgModule } from '@angular/core'
import { APP_BASE_HREF } from '@angular/common'
import { RouterModule } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser'
import { Http } from '@angular/http'
import {
  TranslateModule,
  TranslateLoader,
  TranslateStaticLoader
} from 'ng2-translate/ng2-translate'

import { BaseModule } from './base'

import {
  ROUTES,
  RouteDeclarations
} from './app.routes'
import { RootAppComponent } from './app.component'

import {
  components,
  pipes,
  directives
} from './app.declarations'

@NgModule({
  bootstrap: [
    RootAppComponent
  ],
  declarations: [
    RootAppComponent,
    ...RouteDeclarations,

    ...components,
    ...pipes,
    ...directives
  ],
  imports: [
    BrowserModule,
    BaseModule.forRoot(),

    RouterModule.forRoot(ROUTES),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
      deps: [Http]
    })
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
})
export class AppModule {
}
