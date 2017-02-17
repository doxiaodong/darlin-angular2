const webpack = require('webpack')
const helpers = require('./helpers')
const webpackMerge = require('webpack-merge') // Used to merge webpack configs
const commonConfig = require('./webpack.common.js') // The settings that are common to prod and dev
const autoprefixer = require('autoprefixer')
const chalk = require('chalk')

/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin')

const isProxyProd = helpers.hasNpmFlag('proxy-prod')
console.log(chalk.green('is proxy prod?'), isProxyProd ? chalk.green('true') : chalk.red('false'))

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development'
const HMR = helpers.hasProcessFlag('hot')
const METADATA = {
  baseUrl: '/',
  host: '0.0.0.0',
  port: 3000,
  ENV: ENV,
  HMR: HMR
}

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = webpackMerge(commonConfig({ env: ENV }), {

  /** 
   * Developer tool to enhance debugging
   *
   * See: http://webpack.github.io/docs/configuration.html#devtool
   * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
   */
  devtool: 'eval', // 'cheap-module-eval-source-map' has to many log in chrome

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

    publicPath: '/',

    /** 
     * Specifies the name of each output file on disk.
     * IMPORTANT: You must not specify an absolute path here!
     *
     * See: https://webpack.js.org/configuration/output/#output-filename
     */
    filename: '[name].bundle.js',

    /** 
     * The filename of the SourceMaps for the JavaScript files.
     * They are inside the output.path directory.
     *
     * See: https://webpack.js.org/configuration/output/#output-sourcemapfilename
     */
    sourceMapFilename: '[name].map',

    /** 
     * The filename of non-entry chunks as relative path
     * inside the output.path directory.
     *
     * See: https://webpack.js.org/configuration/output/#output-chunkfilename
     */
    chunkFilename: '[id].chunk.js'

  },

  plugins: [
    /** 
     * Plugin LoaderOptionsPlugin (experimental)
     *
     * See: https://webpack.js.org/plugins/loader-options-plugin/
     */
    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        postcss: [
          autoprefixer({
            browsers: ['last 1 version', '> 10%']
          })
        ],
        tslint: {
          emitErrors: false,
          failOnHint: false,
          resourcePath: 'src'
        }
      }
    }),

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
  ],

  /** 
   * Webpack Development Server configuration
   * Description: The webpack-dev-server is a little node.js Express server.
   * The server emits information about the compilation state to the client,
   * which reacts to those events.
   *
   * See: https://webpack.js.org/configuration/dev-server/
   */
  devServer: {
    port: METADATA.port,
    host: METADATA.host,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    proxy: {
      "/api": {
        target: isProxyProd ? 'https://api.darlin.me' : 'http://0.0.0.0:9999',
        changeOrigin: isProxyProd,
        secure: !isProxyProd,
        pathRewrite: {
          '^/api': ''
        },
        onProxyReq: function(proxyReq, req, res) {
          if (isProxyProd) {
            proxyReq.setHeader('referer', 'https://www.darlin.me')
          }
        }
      }
    }
  },

  node: {
    global: true,
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
})
