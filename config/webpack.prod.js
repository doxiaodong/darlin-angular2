const webpack = require('webpack')
const SriPlugin = require('webpack-subresource-integrity')
const helpers = require('./helpers') // Helper: root(), and rootDir() are defined at the bottom
const webpackMerge = require('webpack-merge') // Used to merge webpack configs
const commonConfig = require('./webpack.common.js') // The settings that are common to prod and dev

/**
 * Webpack Plugins
 */
const ProvidePlugin = require('webpack/lib/ProvidePlugin')
const DefinePlugin = require('webpack/lib/DefinePlugin')
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin')
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin')
const WebpackMd5Hash = require('webpack-md5-hash')

const ImageMinifyPlugin = require('./webpack-plugin/image-minify')
const JsonMinifyPlugin = require('./webpack-plugin/json-minify')

/**
 * Webpack Constants
 */
const ENV = process.env.NODE_ENV = process.env.ENV = 'production'
const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 8080
const METADATA = {
  baseUrl: '/',
  host: HOST,
  port: PORT,
  ENV: ENV,
  HMR: false
}

module.exports = webpackMerge(commonConfig({ env: ENV }), {

  /** 
   * Developer tool to enhance debugging
   *
   * See: http://webpack.github.io/docs/configuration.html#devtool
   * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
   */
  devtool: 'source-map',
  // devtool: 'hidden-source-map',

  /** 
   * Options affecting the output of the compilation.
   *
   * See: https://webpack.js.org/configuration/output/
   */
  output: {

    /** 
     * The output directory as absolute path (required).
     *
     * See: https://webpack.js.org/configuration/output/#output-path
     */
    path: helpers.root('dist'),

    // use static server
    publicPath: '//static.darlin.me/www/',
    // publicPath: '/',

    /** 
     * Specifies the name of each output file on disk.
     * IMPORTANT: You must not specify an absolute path here!
     *
     * See: https://webpack.js.org/configuration/output/#output-filename
     */
    filename: helpers.static + '[name].[chunkhash].js',

    /** 
     * The filename of the SourceMaps for the JavaScript files.
     * They are inside the output.path directory.
     *
     * See: https://webpack.js.org/configuration/output/#output-sourcemapfilename
     */
    sourceMapFilename: '[file].map',

    /** 
     * The filename of non-entry chunks as relative path
     * inside the output.path directory.
     *
     * See: https://webpack.js.org/configuration/output/#output-chunkfilename
     */
    chunkFilename: helpers.static + '[id].[chunkhash].chunk.js',

    jsonpFunction: 'jp',
    
    crossOriginLoading: 'anonymous'

  },

  /** 
   * Add additional plugins to the compiler.
   *
   * See: https://webpack.js.org/configuration/plugins/
   */
  plugins: [

    new SriPlugin({
      hashFuncNames: ['sha256', 'sha384']
    }),

    /** 
     * Plugin LoaderOptionsPlugin (experimental)
     *
     * See: https://webpack.js.org/plugins/loader-options-plugin/
     */
    new webpack.LoaderOptionsPlugin({
      debug: false,
      options: {
        /** 
         * Html loader advanced options
         *
         * See: https://github.com/webpack/html-loader#advanced-options
         * TODO: Need to workaround Angular 2's html syntax => #id [bind] (event) *ngFor
         */
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

        tslint: {
          emitErrors: true,
          failOnHint: true,
          resourcePath: 'src'
        }
      }
    }),

    new ImageMinifyPlugin({
      src: 'src/assets/images',
      dest: 'dist/assets/images'
      // https://github.com/imagemin/imagemin
    }),

    new JsonMinifyPlugin({
      src: 'src/assets/i18n',
      dest: 'assets/i18n'
    }),

    /** 
     * Plugin: WebpackMd5Hash
     * Description: Plugin to replace a standard webpack chunkhash with md5.
     *
     * See: https://www.npmjs.com/package/webpack-md5-hash
     */
    // new WebpackMd5Hash(),

    /** 
     * Plugin: DefinePlugin
     * Description: Define free variables.
     * Useful for having development builds with debug logging or adding global constants.
     *
     * Environment helpers
     *
     * See: https://webpack.js.org/plugins/define-plugin/
     * NOTE: when adding more properties make sure you include them in custom-typings.d.ts
     */
    new DefinePlugin({
      'ENV': JSON.stringify(METADATA.ENV),
      'HMR': METADATA.HMR,
      'process.env': {
        'ENV': JSON.stringify(METADATA.ENV),
        'NODE_ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR,
      }
    }),


    /** 
     * Plugin: UglifyJsPlugin
     * Description: Minimize all JavaScript output of chunks.
     * Loaders are switched into minimizing mode.
     *
     * See: https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
     * NOTE: To debug prod builds uncomment //debug lines and comment //prod lines
     */
    new UglifyJsPlugin({
      sourceMap: true,
      beautify: false, //prod
      output: {
        comments: false
      }, //prod
      mangle: {
        screw_ie8: true
      }, //prod
      compress: {
        screw_ie8: true,
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        negate_iife: false // we need this for lazy v8
      }
    })

  ],

  node: {
    global: true,
    crypto: 'empty',
    process: false,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
})
