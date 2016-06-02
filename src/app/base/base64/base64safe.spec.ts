import {
  it,
  inject,
  describe
} from '@angular/core/testing';

import {
  Component,
  provide
} from '@angular/core';

import b64 from './base64safe.service';

describe('base64safe.service.ts base64safe', () => {

  it('should encode correct', inject([], () => {
    expect(b64.encode('darlin.me')).toEqual('ZGFybGluLm1l');
    expect(b64.encode('')).toEqual('');

  }));

  it('should decode correct', inject([], () => {
    expect(b64.decode('ZGFybGluLm1l')).toEqual('darlin.me');
    expect(b64.decode('')).toEqual('');

  }));

});
