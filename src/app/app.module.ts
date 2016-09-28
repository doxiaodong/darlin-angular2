import { NgModule } from '@angular/core'
import { APP_BASE_HREF } from '@angular/common'
import { RouterModule } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser'

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
    BaseModule,

    RouterModule.forRoot(ROUTES)
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
})
export class AppModule {
}
