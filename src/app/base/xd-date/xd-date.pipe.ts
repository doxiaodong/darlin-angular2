import {
  Pipe,
  PipeTransform
} from '@angular/core'
import * as moment from 'moment'
// import { DatePipe } from '@angular/common'
// import { checkDateFormat } from './check-date.fn'

@Pipe({
  name: 'xdDate'
})
export class XdDatePipe implements PipeTransform {
  transform(value: any, lang: string): string {
    if (lang === 'en_US') {
      moment.locale('en')
    }
    if (lang === 'zh_CN') {
      moment.locale('zh-cn')
    }
    return moment(value).fromNow()
    // let date = new Date(value)
    // return new DatePipe().transform(date, checkDateFormat(date))

  }

}
