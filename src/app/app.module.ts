import {
  NgModule,
  ApplicationRef
} from '@angular/core'
import { APP_BASE_HREF } from '@angular/common'
import { RouterModule } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser'
import { Http } from '@angular/http'
import { MdButtonModule } from '@angular/material/button'
import {
  TranslateModule,
  TranslateLoader,
  TranslateStaticLoader
} from 'ng2-translate/ng2-translate'
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr'
import { AppStore } from './app.store'

import { ShareModule } from './share'

import {
  ROUTES,
  RouteDeclarations
} from './app.routes'
import { RootAppComponent } from './app.component'

import {
  components,
  pipes,
  directives
} from './declarations'

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
    ShareModule.forRoot(),

    RouterModule.forRoot(ROUTES),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
      deps: [Http]
    }),
    MdButtonModule.forRoot()
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    AppStore
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appStore: AppStore) { }
  hmrOnInit(store) {
    if (!store || !store.state) { return }
    console.log('HMR store', JSON.stringify(store, null, 2))
    // restore state
    this.appStore.setState(store.state)
    // restore input values
    if ('restoreInputValues' in store) { store.restoreInputValues() }
    this.appRef.tick()
    Object.keys(store).forEach(prop => delete store[prop])
  }
  hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement)
    const currentState = this.appStore.getState()
    store.state = currentState
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation)
    // save input values
    store.restoreInputValues = createInputTransfer()
    // remove styles
    removeNgStyles()
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts()
    delete store.disposeOldHosts
  }
}
