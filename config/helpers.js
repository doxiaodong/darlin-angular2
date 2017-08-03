const path = require('path')
const autoprefixer = require('autoprefixer')

const EVENT = process.env.npm_lifecycle_event || ''

// Helper functions
const ROOT = path.resolve(__dirname, '..')

function hasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1
}

function hasNpmFlag(flag) {
  return EVENT.includes(flag);
}

const root = path.join.bind(path, ROOT)
console.log('root directory:', root() + '\n')

exports.hasProcessFlag = hasProcessFlag
exports.hasNpmFlag = hasNpmFlag
exports.root = root

exports.static = 'assets/'
exports.postcssConfig = {
  plugins: [
    autoprefixer({
      browsers: ['last 1 version', '> 10%']
    })
  ]
}
