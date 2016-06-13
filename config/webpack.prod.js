var helpers = require('./helpers'); // Helper: root(), and rootDir() are defined at the bottom
var webpackMerge = require('webpack-merge'); //Used to merge webpack configs
var commonConfig = require('./webpack.common.js'); //The settings that are common to prod and dev

/**
 * Webpack Plugins
 */
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var WebpackMd5Hash = require('webpack-md5-hash');

var ImageMinifyPlugin = require('./webpack-plugin/image-minify');
var JsonMinifyPlugin = require('./webpack-plugin/json-minify');

/**
 * Webpack Constants
 */
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const METADATA = webpackMerge(commonConfig.metadata, {
  host: HOST,
  port: PORT,
  ENV: ENV,
  HMR: false
});

module.exports = webpackMerge(commonConfig, {
  // Switch loaders to debug mode.
  //
  // See: http://webpack.github.io/docs/configuration.html#debug
  debug: false,

  // Developer tool to enhance debugging
  //
  // See: http://webpack.github.io/docs/configuration.html#devtool
  // See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
  // devtool: 'source-map',
  devtool: 'hidden-source-map',

  // Options affecting the output of the compilation.
  //
  // See: http://webpack.github.io/docs/configuration.html#output
  output: {

    // The output directory as absolute path (required).
    //
    // See: http://webpack.github.io/docs/configuration.html#output-path
    path: helpers.root('dist'),

    // use static server
    publicPath: "//static.darlin.me/",

    // Specifies the name of each output file on disk.
    // IMPORTANT: You must not specify an absolute path here!
    //
    // See: http://webpack.github.io/docs/configuration.html#output-filename
    filename: helpers.static + '[name].[chunkhash].js',

    // The filename of the SourceMaps for the JavaScript files.
    // They are inside the output.path directory.
    //
    // See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
    sourceMapFilename: '[file].map',

    // The filename of non-entry chunks as relative path
    // inside the output.path directory.
    //
    // See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
    chunkFilename: helpers.static + '[id].[chunkhash].chunk.js'

  },

  // Add additional plugins to the compiler.
  //
  // See: http://webpack.github.io/docs/configuration.html#plugins
  plugins: [

    new ImageMinifyPlugin({
      src: 'src/assets/images',
      dest: 'dist/assets/images'
      // https://github.com/imagemin/imagemin
    }),

    new JsonMinifyPlugin({
      src: 'src/assets/i18n',
      dest: 'assets/i18n'
    }),

    // Plugin: WebpackMd5Hash
    // Description: Plugin to replace a standard webpack chunkhash with md5.
    //
    // See: https://www.npmjs.com/package/webpack-md5-hash
    new WebpackMd5Hash(),

    // Plugin: DedupePlugin
    // Description: Prevents the inclusion of duplicate code into your bundle
    // and instead applies a copy of the function at runtime.
    //
    // See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    // See: https://github.com/webpack/docs/wiki/optimization#deduplication
    new DedupePlugin(),

    // Plugin: DefinePlugin
    // Description: Define free variables.
    // Useful for having development builds with debug logging or adding global constants.
    //
    // Environment helpers
    //
    // See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    // NOTE: when adding more properties make sure you include them in custom-typings.d.ts
    new DefinePlugin({
      'ENV': JSON.stringify(METADATA.ENV),
      'HMR': METADATA.HMR,
      'process.env': {
        'ENV': JSON.stringify(METADATA.ENV),
        'NODE_ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR,
      }
    }),


    // Plugin: UglifyJsPlugin
    // Description: Minimize all JavaScript output of chunks.
    // Loaders are switched into minimizing mode.
    //
    // See: https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
    // NOTE: To debug prod builds uncomment //debug lines and comment //prod lines
    new UglifyJsPlugin({

      beautify: false, //prod

      mangle: {
        screw_ie8 : true
      }, //prod
      compress: {
        screw_ie8: true
      }, //prod
      comments: false //prod
    }),

  ],

  // Static analysis linter for TypeScript advanced options configuration
  // Description: An extensible linter for the TypeScript language.
  //
  // See: https://github.com/wbuchwalter/tslint-loader
  tslint: {
    emitErrors: true,
    failOnHint: true,
    resourcePath: 'src'
  },

  // Html loader advanced options
  //
  // See: https://github.com/webpack/html-loader#advanced-options
  // TODO: Need to workaround Angular 2's html syntax => #id [bind] (event) *ngFor
  htmlLoader: {
    minimize: true,
    removeAttributeQuotes: false,
    caseSensitive: true,
    customAttrSurround: [
      [/#/, /(?:)/],
      [/\*/, /(?:)/],
      [/\[?\(?/, /(?:)/]
    ],
    customAttrAssign: [/\)?\]?=/]
  },

  node: {
    global: 'window',
    crypto: 'empty',
    process: false,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
});
