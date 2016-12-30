import { getCookie } from './get-cookie.service'
const md5 = require('crypto-js/md5')

export function getAESToken() {
  return md5(getCookie('csrftoken')).toString()
}
