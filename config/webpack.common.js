const webpack = require('webpack')
const helpers = require('./helpers')
const chalk = require('chalk')

/**
 * Webpack Plugins
 */
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlElementsPlugin = require('./webpack-plugin/html-elements')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ngcWebpack = require('ngc-webpack')

const AOT = helpers.hasNpmFlag('aot')
console.log(chalk.green('is aot?'), AOT ? chalk.green('true') : chalk.red('false'))

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function(option) {
  const isProd = option.env === 'production'
  return {
    entry: {
      'lib': [
        './src/polyfills.ts',
        './src/vendor.ts'
      ],
      'main': AOT ? './src/main.browser.aot.ts' : './src/main.browser.ts'

    },

    /**
     * Options affecting the resolving of modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {
      /**
       * An array of extensions that should be used to resolve modules.
       *
       * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
       */
      extensions: ['.ts', '.js'],

      alias: {
        svg: helpers.root('src/svg'),
        app: helpers.root('src/app')
      }

    },

    /**
     * Options affecting the normal modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#module
     */
    module: {
      rules: [{
        test: /\.ts$/,
        use: [
          '@angularclass/hmr-loader?pretty=' + !isProd + '&prod=' + isProd,
          {
            loader: 'ng-router-loader',
            options: {
              loader: 'async-import',
              genDir: 'compiled',
              aot: AOT
            }
          },
          'ts-loader?{configFileName: "tsconfig' + (AOT ? '.aot' : '') + '.json"}',
          'angular2-template-loader'
        ],
        exclude: [/\.(spec|e2e)\.ts$/]
      },
      {
        test: /\.svg$/,
        use: 'svg-sprite-loader?' + JSON.stringify({
          name: '[name]-[hash]'
        })
      },
      /** 
       * Json loader support for *.json files.
       * 
       * See: https://github.com/webpack/json-loader
       */
      {
        test: /\.json$/,
        use: 'json-loader',
        exclude: [/\.font\.json$/]
      },
      {
        test: /(global|\.min)\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?minimize!postcss-loader'
        })
      },
      /** 
       * Raw loader support for *.css files
       * Returns file content as string
       * 
       * See: https://github.com/webpack/raw-loader
       */
      {
        test: /\.css$/,
        use: [
          'raw-loader',
          'postcss-loader'
        ],
        exclude: [/(global|\.min)\.css$/]
      },
      {
        test: /global\.less$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            'css-loader?minimize',
            'postcss-loader',
            'less-loader'
          ]
        })
      },
      {
        test: /global\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            'css-loader?minimize',
            'postcss-loader',
            'sass-loader'
          ]
        })
      },
      {
        test: /\.less$/,
        use: [
          'raw-loader',
          'postcss-loader',
          'less-loader'
        ],
        exclude: [/global\.less$/]
      },
      {
        test: /\.scss$/,
        use: [
          'raw-loader',
          'postcss-loader',
          'sass-loader'
        ],
        exclude: [/global\.scss$/]
      },
      /**
       * Raw loader support for *.html
       * Returns file content as string
       * 
       * See: https://github.com/webpack/raw-loader
       */
      {
        test: /\.html$/,
        use: 'raw-loader',
        exclude: [helpers.root('src/index.html')]
      },
      {
        test: /\.md$/,
        use: 'raw-loader'
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          `file-loader?hash=sha512&digest=hex&name=${helpers.static}[name]-[hash]`,
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }]

    },

    /** 
     * Add additional plugins to the compiler.
     * 
     * See: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins: [
      new HtmlElementsPlugin({
        headTags: require('./head-config.common')
      }),

      // third js
      new webpack.ProvidePlugin({
        // marked: 'marked',
        hljs: 'highlight.js',
        // md5: 'crypto-js/md5',
        // emojione: 'emojione',
        base64: 'js-base64'
        // sha512: 'crypto-js/sha512'
      }),

      new ExtractTextPlugin(helpers.static + 'main.[hash].css'),

      /** 
       * Plugin: CommonsChunkPlugin
       * Description: Shares common code between the pages.
       * It identifies common modules and put them into a commons chunk.
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
       * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
       */
      new webpack.optimize.CommonsChunkPlugin({
        name: ['lib']
      }),

      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'lib',
      //   chunks: ['lib']
      // }),

      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'vendor',
      //   chunks: ['main'],
      //   minChunks: module => /node_modules\//.test(module.resource)
      // }),

      // new webpack.optimize.CommonsChunkPlugin({
      //   name: ['lib', 'vendor'].reverse()
      // }),

      /** 
       * Plugin: CopyWebpackPlugin
       * Description: Copy files and directories in webpack.
       *
       * Copies project static assets.
       *
       * See: https://www.npmjs.com/package/copy-webpack-plugin
       */
      new CopyWebpackPlugin(
        [
          { from: 'src/assets', to: 'assets' },
          { from: 'src/favicon.ico', to: 'favicon.ico' },
          { from: 'src/sw.js', to: 'sw.js' },
        ],
        { ignore: ['.DS_Store', 'images/**/*', 'i18n/**/*'] }
      ),

      /** 
       * Plugin: HtmlWebpackPlugin
       * Description: Simplifies creation of HTML files to serve your webpack bundles.
       * This is especially useful for webpack bundles that include a hash in the filename
       * which changes every compilation.
       *
       * See: https://github.com/ampedandwired/html-webpack-plugin
       */
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        minify: {
          minifyCSS: true,
          collapseWhitespace: true,
          removeComments: true
        },
        chunksSortMode: 'dependency'
      }),

      // moment 语言包只加载 zh-cn
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),

      // https://github.com/angular/angular/issues/11580
      new webpack.ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        helpers.root('./src') // location of oyour src
      ),

      new ngcWebpack.NgcWebpackPlugin({
        disabled: !AOT,
        tsConfig: helpers.root('tsconfig.aot.json')
      })

    ],

    /** 
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
      global: true,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  }
}
