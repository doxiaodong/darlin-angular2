import API_PREFIX from '../api-prefix/api-prefix.service'
import { Dhttp } from '../injector/http-injector'

class Api {

  private prefix: string

  overview() {
    return Dhttp.get(this.prefix + '/initHomePage/')
  }

  constructor() {
    this.prefix = API_PREFIX
  }

}

export const BaseApi = new Api()
