import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { BaseModule } from '../base'
import { TranslateService } from 'ng2-translate/ng2-translate'
import { AbTranslateService } from '../translate'

import { SigninCheck } from './signin-check'

import { UserInfoComponent } from './user-info.component'
import { UserSettingComponent } from './setting.component'
import { ChangePasswordComponent } from './change-password.component'
import { ResetPasswordComponent } from './reset-password.component'

import {
  components,
  pipes,
  directives
} from './user.declarations'

const ROUTER_CONFIG = [
  { path: 'info/:user', component: UserInfoComponent, canActivate: [SigninCheck] },
  { path: 'setting', component: UserSettingComponent, canActivate: [SigninCheck] },
  { path: 'changePassword', component: ChangePasswordComponent, canActivate: [SigninCheck] },
  { path: 'resetPassword', component: ResetPasswordComponent, canActivate: [SigninCheck] }
]

const RouteDeclarations = [
  UserInfoComponent,
  UserSettingComponent,
  ChangePasswordComponent,
  ResetPasswordComponent
]

@NgModule({
  declarations: [
    ...RouteDeclarations,

    ...components,
    ...pipes,
    ...directives
  ],
  providers: [
    SigninCheck
  ],
  imports: [
    BaseModule,
    RouterModule.forChild(ROUTER_CONFIG)
  ]
})
export class UserModule {
  constructor(
    ts: TranslateService
  ) {
    ts.use(AbTranslateService.lang)
    AbTranslateService.updateTranslate$.subscribe((lang: string) => {
      ts.use(lang)
    })
  }
}
