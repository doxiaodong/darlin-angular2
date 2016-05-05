import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
  name: 'xdDate'
})
export class XdDatePipe implements PipeTransform {
  transform(dateString: string): string {

    let date = new Date(dateString);
    return new DatePipe().transform(date, checkDateFormate(date));

  }

}

function checkDateFormate(date): string {

  let now = new Date().getTime();
  let time = date.getTime();

  let r = now - time;

  if (r < 24*60*60*1000) {
    return 'HH:mm:ss';
  }
  // if (r < 30*24*60*60*1000) {
  //   return 'MM-dd HH:mm';
  // }
  if (r < 365*24*60*60*1000) {
    return 'MM-dd HH:mm';
  }

  return 'y-MM-dd HH:mm';

}