"use strict" // es6 need strict

const path = require('path')
const Imagemin = require('imagemin')

class ImageMinifyPlugin {

  apply(compiler) {

    // v5.0
    Imagemin([path.join(this.src, '**/*.{gif,jpg,png,svg}')], this.dest).then(files => {
      console.log(' image minify')
    })

    // v4.0
    // new Imagemin()
    // .src(path.join(this.src, '**/*.{gif,jpg,png,svg}'))
    // .dest(this.dest)
    // .use(Imagemin.jpegtran({progressive: true}))
    // .run((err, files) => {
    //     console.log(' image minify')
    // })
  }

  constructor(options) {
    this.src = options.src
    this.dest = options.dest
  }

}

module.exports = ImageMinifyPlugin
