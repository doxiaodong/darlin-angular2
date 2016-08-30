import { ApiPrefix } from '../base/api-prefix/api-prefix.service'
import { Dhttp2 } from '../base/injector/http-injector'

class Api {

  private prefix: string

  getLinks() {
    return Dhttp2.get(this.prefix + '/links/?format=json')
  }

  constructor() {
    this.prefix = ApiPrefix.get('API_PREFIX')
  }

}

export const LinksApi = new Api()
