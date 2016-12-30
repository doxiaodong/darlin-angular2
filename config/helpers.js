const path = require('path')

const EVENT = process.env.npm_lifecycle_event || ''

// Helper functions
const ROOT = path.resolve(__dirname, '..')

console.log('root directory:', root() + '\n')

function hasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1
}

function hasNpmFlag(flag) {
  return EVENT.includes(flag);
}

function root(args) {
  args = Array.prototype.slice.call(arguments, 0)
  return path.join.apply(path, [ROOT].concat(args))
}

exports.hasProcessFlag = hasProcessFlag
exports.hasNpmFlag = hasNpmFlag
exports.root = root

exports.static = 'assets/'
