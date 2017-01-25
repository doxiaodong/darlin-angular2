import { getCookie } from './get-cookie.service'
import { MD5 as md5 } from 'crypto-js'

export function getAESToken() {
  return md5(getCookie('csrftoken')).toString()
}
