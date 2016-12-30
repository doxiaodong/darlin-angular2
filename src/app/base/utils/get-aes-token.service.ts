import { getCookie } from './get-cookie.service'
// const md5 = require('crypto-js/md5')
import * as cryptoJS from 'crypto-js'
const md5 = cryptoJS.MD5

export function getAESToken() {
  return md5(getCookie('csrftoken')).toString()
}
