let API_PREFIX: string = ''

if ('production' === ENV) {
  // Production
  API_PREFIX = 'https://api.darlin.me'

} else {
  // Development
  API_PREFIX = '/api'
}

export default API_PREFIX
