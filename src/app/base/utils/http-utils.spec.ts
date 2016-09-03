import { inject } from '@angular/core/testing'

import {
  HttpUtilsService as hu
} from './http-utils.service'

describe('http-utils.service.ts http body pre deal', () => {

  it('should covent correct', inject([], () => {

    expect(hu.paramPostBody({
      a: 1,
      b: 2
    })).toEqual('a=1&b=2')

    expect(hu.paramPostBody({
      a: 'http://darlin.me',
      'a b': 2
    })).toEqual('a=http%3A%2F%2Fdarlin.me&a%20b=2')

  }))

})
