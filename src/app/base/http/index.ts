import { DhttpFetch } from '../fetch'
import { DhttpXHR } from './http-xhr'

export let Dhttp

if (global['fetch']) {
  Dhttp = DhttpFetch
} else {
  Dhttp = DhttpXHR
}
