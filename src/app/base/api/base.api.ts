import API_PREFIX from 'app/base/api-prefix/api-prefix.service'
import { Dhttp } from 'app/base/http'

class Api {
  overview() {
    return Dhttp.get(API_PREFIX + '/initHomePage/')
  }
}

export const BaseApi = new Api()
