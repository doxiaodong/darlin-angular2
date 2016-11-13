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
    expect(title).not.toEqual('')
  })

  it('should have navbar', () => {
    let subject = element(by.css('[navbar]')).isPresent()
    let result = true
    expect(subject).toEqual(result)
  })

  it('should have footer', () => {
    let subject = element(by.css('[footer]')).isPresent()
    let result = true
    expect(subject).toEqual(result)
  })

  it('should have bg-picture', () => {
    let subject = element(by.css('#bg-picture')).isPresent()
    let result = true
    expect(subject).toEqual(result)
  })

  it('should have alert', () => {
    let subject = element(by.css('[alert]')).isPresent()
    let result = true
    expect(subject).toEqual(result)
  })

  it('should have sign-modal', () => {
    let subject = element(by.css('[sign-modal]')).isPresent()
    let result = true
    expect(subject).toEqual(result)
  })

  it('should have loading', () => {
    let subject = element(by.css('loading')).isPresent()
    let result = true
    expect(subject).toEqual(result)
  })

})
