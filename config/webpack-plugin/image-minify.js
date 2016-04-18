var path = require('path');
var Imagemin = require('imagemin');

function ImageMinifyPlugin(options) {
  this.src = options.src;
  this.dest = options.dest;

}

ImageMinifyPlugin.prototype.apply = function(compiler) {

  var _context = compiler.options.context;
  var _path = path.resolve(_context, this.src);
  new Imagemin()
  .src(path.join(this.src, '**/*.{gif,jpg,png,svg}'))
  .dest(this.dest)
  .use(Imagemin.jpegtran({progressive: true}))
  .run((err, files) => {
      console.log(' image minify');
  });

};

module.exports = ImageMinifyPlugin;
