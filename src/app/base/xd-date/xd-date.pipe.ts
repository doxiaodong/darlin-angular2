import {
  Pipe,
  PipeTransform
} from '@angular/core';
import {DatePipe} from '@angular/common';
import {checkDateFormat} from './check-date.fn';

@Pipe({
  name: 'xdDate'
})
export class XdDatePipe implements PipeTransform {
  transform(value: any): string {

    let date = new Date(value);
    return new DatePipe().transform(date, checkDateFormat(date));

  }

}
