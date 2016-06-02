import {
  it,
  inject,
  describe
} from '@angular/core/testing';

import {
  Component,
  provide
} from '@angular/core';

import {
   PicUrl as pu
} from './pic-url.service';

describe('pic-url.service.ts get complete head picture', () => {

  it('should get complete url normally', inject([], () => {

    expect(pu.getUrl('aaa/bbb/c.png')).toEqual('//o4vwdjxrs.qnssl.com/aaa/bbb/c.png-headPicture');

  }));

  it('should get complete url third, http -> https', inject([], () => {

    expect(pu.getUrl('http://aaa/bbb/c.png')).toEqual('https://aaa/bbb/c.png');
    expect(pu.getUrl('https://aaa/bbb/c.png')).toEqual('https://aaa/bbb/c.png');

  }));

});
