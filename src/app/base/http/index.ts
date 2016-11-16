import { DhttpFetch } from '../fetch'
import { DhttpXHR } from './http-xhr'

export let Dhttp

if (fetch) {
  Dhttp = DhttpFetch
} else {
  Dhttp = DhttpXHR
}
