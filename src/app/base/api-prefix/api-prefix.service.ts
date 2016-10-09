let API_PREFIX: string = ''

if ('production' === ENV) {
  // Production
  if (window.location.hostname === 'ashe.darlin.me') {
    API_PREFIX = '//api.ashe.darlin.me'
  } else {
    API_PREFIX = 'https://api.darlin.me'
  }

} else {
  // Development
  API_PREFIX = '/api'
}

export default API_PREFIX
