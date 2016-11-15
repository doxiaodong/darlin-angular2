import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { ShareModule } from '../share'

import { SigninCheck } from './signin-check'

import { UserInfoComponent } from './user-info/user-info.component'
import { UserSettingComponent } from './setting/setting.component'
import { ChangePasswordComponent } from './change-password/change-password.component'
import { ResetPasswordComponent } from './reset-password/reset-password.component'

import {
  components,
  pipes,
  directives
} from './declarations'

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
    ShareModule,
    RouterModule.forChild(ROUTER_CONFIG)
  ]
})
export class UserModule {
  constructor() { }
}
