import API_PREFIX from 'app/base/api-prefix/api-prefix.service'
import { Dhttp } from 'app/base/http'

class Api {

  getLinks() {
    return Dhttp.get(API_PREFIX + '/links/?format=json')
  }

}

export const LinksApi = new Api()
