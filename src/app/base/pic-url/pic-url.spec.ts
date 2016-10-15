import { inject } from '@angular/core/testing'

import {
  PicUrl as pu
} from './pic-url.service'

describe('pic-url.service.ts get complete head picture', () => {

  it('should get complete url normally', inject([], () => {

    expect(pu.getUrl('aaa/bbb/c.png'))
      .toEqual('//media.darlin.me/aaa/bbb/c.png-headPicture')

  }))

  it('should get complete url third, http -> https', inject([], () => {

    expect(pu.getUrl('http://aaa/bbb/c.png')).toEqual('https://aaa/bbb/c.png')
    expect(pu.getUrl('https://aaa/bbb/c.png')).toEqual('https://aaa/bbb/c.png')

  }))

  it('should get gravatar', inject([], () => {
    expect(pu.getUrl('none', 'duxiaodong@darlin.me'))
      .toEqual('https://s.gravatar.com/avatar/da1a0f997a3329f53529b28f5f6d3536?s=100')
  }))

})
