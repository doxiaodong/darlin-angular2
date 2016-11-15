import { MarkedComponent } from './marked/marked.component'

import { XdDatePipe } from './xd-date/xd-date.pipe'

import { PageAnimateDirective } from './page-animate/page-animate.directive'
import { TitleDirective } from './title/title.directive'
import { FullScreenDirective } from './full-screen/full-screen.directive'

export const components = [
  MarkedComponent
]

export const pipes = [
  XdDatePipe
]

export const directives = [
  PageAnimateDirective,
  TitleDirective,
  FullScreenDirective
]
