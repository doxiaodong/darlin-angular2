class Vue {

  $watch(key, cb) {
    this._watchFnObj[key].push(cb)
  }

  constructor(config) {
    this._data = {}
    this._watchFnObj = {}
    const data = config.data
    for (let key in data) {
      this._watchFnObj[key] = []
      Object.defineProperty(this, key, {
        get() {
          return this._data[key]
        },
        set(value) {
          this._watchFnObj[key].forEach((cb) => {
            cb(value)
          })
          this._data[key] = value
        },
        configurable: true,
        enumerable: true
      })
      this[key] = data[key]
    }
  }
}

const v = new Vue({
  data: {
    a: {a: 2},
    b: 2
  }
})

v.$watch('a', (value) => {
  console.log('1. watch, value: %s', value)
})

v.$watch('a', (value) => {
  console.log('2. watch again, value: %s', value)
})

setTimeout(() => {
  v.a = 4
}, 1000)
