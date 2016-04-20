"use strict"; // es6 need strict

var path = require('path');
var Imagemin = require('imagemin');

class ImageMinifyPlugin {

  apply(compiler) {
    new Imagemin()
    .src(path.join(this.src, '**/*.{gif,jpg,png,svg}'))
    .dest(this.dest)
    .use(Imagemin.jpegtran({progressive: true}))
    .run((err, files) => {
        console.log(' image minify');
    });
  }

  constructor(options) {
    this.src = options.src;
    this.dest = options.dest;
  }

}

module.exports = ImageMinifyPlugin;
