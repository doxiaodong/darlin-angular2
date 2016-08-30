import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

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
    BaseModule,

    RouterModule.forRoot(ROUTES)
  ]
})
export class AppModule {
}
