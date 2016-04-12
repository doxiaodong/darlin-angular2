import {
  it,
  inject,
  injectAsync,
  describe,
  beforeEachProviders
} from 'angular2/testing';

import {Component, provide} from 'angular2/core';

import {UrlSafeBase64Service} from './base64safe.service';

describe('base64safe', () => {
  beforeEachProviders(() => [
    UrlSafeBase64Service
  ]);

  it('should encode correct', inject([ UrlSafeBase64Service ], (b64) => {
    expect(b64.encode('darlin.me')).toEqual('ZGFybGluLm1l');
    expect(b64.encode('')).toEqual('');

  }));

  it('should decode correct', inject([ UrlSafeBase64Service ], (b64) => {
    expect(b64.decode('ZGFybGluLm1l')).toEqual('darlin.me');
    expect(b64.decode('')).toEqual('');

  }));

});
