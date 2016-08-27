import {inject} from '@angular/core/testing';

import {
  checkDateFormat as cdf
} from './check-date.fn';

describe('check-date.fn.ts return date format', () => {
  let now = new Date('Mon Jun 27 2016 22:17:00 GMT+0800 (CST)');

  it('should return right format', inject([], () => {

    expect(cdf(new Date('Mon Jun 27 2016 01:00:00 GMT+0800 (CST)'), now)).toEqual('HH:mm:ss');

    expect(cdf(new Date('Sun Jun 26 2016 01:00:00 GMT+0800 (CST)'), now)).toEqual('MM-dd HH:mm');

    expect(cdf(new Date('Tue Jun 28 2016 01:00:00 GMT+0800 (CST)'), now)).toEqual('MM-dd HH:mm');

    expect(cdf(new Date('Sat Jun 27 2015 22:17:00 GMT+0800 (CST)'), now)).toEqual('y-MM-dd HH:mm');

    expect(cdf(new Date('Sun Jun 28 2015 22:17:00 GMT+0800 (CST)'), now)).toEqual('y-MM-dd HH:mm');

    expect(cdf(new Date('Tue Jun 27 2017 22:17:00 GMT+0800 (CST)'), now)).toEqual('y-MM-dd HH:mm');

  }));

});
