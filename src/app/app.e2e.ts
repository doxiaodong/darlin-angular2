import {
  browser,
  element,
  by
} from 'protractor'

describe('app e2e', () => {

  beforeEach(() => {
    browser.get('/404')
  })

  it('should have a title', () => {
    let title = browser.getTitle()
    expect<any>(title).not.toEqual('')
  })

  it('should have navbar', () => {
    let subject = element(by.css('comp-navbar')).isPresent()
    let result = true
    expect<any>(subject).toEqual(result)
  })

  it('should have footer', () => {
    let subject = element(by.css('comp-footer')).isPresent()
    let result = true
    expect<any>(subject).toEqual(result)
  })

  it('should have bg-picture', () => {
    let subject = element(by.css('#bg-picture')).isPresent()
    let result = true
    expect<any>(subject).toEqual(result)
  })

  it('should have alert', () => {
    let subject = element(by.css('comp-alert')).isPresent()
    let result = true
    expect<any>(subject).toEqual(result)
  })

  it('should have sign-modal', () => {
    let subject = element(by.css('comp-sign-modal')).isPresent()
    let result = true
    expect<any>(subject).toEqual(result)
  })

  it('should have loading', () => {
    let subject = element(by.css('comp-loading')).isPresent()
    let result = true
    expect<any>(subject).toEqual(result)
  })

  it('should have music', () => {
    let subject = element(by.css('comp-music')).isPresent()
    let result = true
    expect<any>(subject).toEqual(result)
  })

})
