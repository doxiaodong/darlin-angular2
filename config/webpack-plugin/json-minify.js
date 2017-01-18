const apply = require('./read-files')
const jsonminify = require("jsonminify")

function JsonMinifyPlugin(options) {
  this.src = options.src
  this.dest = options.dest
}

JsonMinifyPlugin.prototype.apply = function(compiler) {

  apply(compiler, {
    src: this.src,
    dest: this.dest,
    name: 'json minify',
    method: JM
  })

}

module.exports = JsonMinifyPlugin

function JM(context) {
  // return context
  return jsonminify(context.toString())
}
