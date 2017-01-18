const path = require('path')
const fs = require('fs')
const dir = require('node-dir')

const apply = function(compiler, opts) {
  const _context = compiler.options.context
  const _path = path.resolve(_context, opts.src)

  compiler.plugin('emit', function(compilation, done) {

    dir.readFiles(_path,
      function(err, content, next) {
        if (err) throw err
        next()
      },
      function(err, files) {
        if (err) throw err
        files.map(function(file) {
          if (!/\.DS_Store$/.test(file)) {

            const _file = file.replace(_path + '/', '')
            const destPath = path.join(opts.dest, _file)
            compilation.assets[destPath] = {
              source: function() {
                return opts.method(fs.readFileSync(file))
              },
              size: function() {
                return Buffer.byteLength(this.source(), 'utf8')
              }
            }
          }
        })
        done()
      })
  })

  compiler.plugin('done', function() {
    console.log(': ' + opts.name + ' complete!')
  })

}

module.exports = apply
