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
  transform(dateString: string): string {

    let date = new Date(dateString);
    return new DatePipe().transform(date, checkDateFormat(date));

  }

}
