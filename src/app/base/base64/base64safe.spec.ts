import {
  it,
  inject,
  describe
} from 'angular2/testing';

import {Component, provide} from 'angular2/core';

import b64 from './base64safe.service';

describe('base64safe', () => {

  it('should encode correct', inject([], () => {
    expect(b64.encode('darlin.me')).toEqual('ZGFybGluLm1l');
    expect(b64.encode('')).toEqual('');

  }));

  it('should decode correct', inject([], () => {
    expect(b64.decode('ZGFybGluLm1l')).toEqual('darlin.me');
    expect(b64.decode('')).toEqual('');

  }));

});
