const staticCacheName = 'static'
const version = 'v3::'
const cacheKeys = [
  /static\.darlin\.me/,
  /upcdn\.tristana\.cc/,
  /cdn\.bootcss\.com/,
  /cdn\.mathjax\.org/,
  /cdn\.jsdelivr\.net/
]

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys()
      .then(function(keys) {
        return Promise.all(keys
          .filter(function(key) {
            return key.indexOf(version) !== 0
          })
          .map(function(key) {
            return caches.delete(key)
          })
        )
      })
  )
})

self.addEventListener('fetch', function(event) {
  const request = event.request
  const isCache = cacheKeys.some(k => k.test(request.url))
  if (isCache) {
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) {
          return response
        }
        return fetch(request.clone()).then((fetchResponse) => {

          const responseClone = fetchResponse.clone()
          caches.open(version + staticCacheName)
            .then(cache => {
              cache.put(request, responseClone)
            })

          return fetchResponse
        })
      })
    )
  }

})
