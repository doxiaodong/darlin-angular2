const webpack = require('webpack')
const helpers = require('./helpers')

/**
 * Webpack Plugins
 */
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

/**
 * Webpack Constants
 */
const METADATA = {
  baseUrl: '/'
}

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {

  // Static metadata for index.html
  //
  // See: (custom attribute)
  metadata: METADATA,

  // Cache generated modules and chunks to improve performance for multiple incremental builds.
  // This is enabled by default in watch mode.
  // You can pass false to disable it.
  //
  // See: http://webpack.github.io/docs/configuration.html#cache
  // cache: false,

  // The entry point for the bundle
  // Our Angular.js app
  //
  // See: http://webpack.github.io/docs/configuration.html#entry
  entry: {

    // 'polyfills': './src/polyfills.ts',
    // 'vendor': './src/vendor.ts',
    'lib': ['./src/polyfills.ts', './src/vendor.ts'],
    'main': './src/main.browser.ts'

  },

  // Options affecting the resolving of modules.
  //
  // See: http://webpack.github.io/docs/configuration.html#resolve
  resolve: {

    // An array of extensions that should be used to resolve modules.
    //
    // See: http://webpack.github.io/docs/configuration.html#resolve-extensions
    extensions: ['', '.ts', '.js'],

    // Make sure root is src
    root: helpers.root('src'),

    // remove other default values
    modulesDirectories: ['node_modules']

  },

  // Options affecting the normal modules.
  //
  // See: http://webpack.github.io/docs/configuration.html#module
  module: {

    // An array of applied pre and post loaders.
    //
    // See: http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
    preLoaders: [

      {
        test: /\.ts$/,
        loader: 'string-replace-loader',
        query: {
          search: '(System|SystemJS)(.*[\\n\\r]\\s*\\.|\\.)import\\((.+)\\)',
          replace: '$1.import($3).then(mod => mod.__esModule ? mod.default : mod)',
          flags: 'g'
        },
        include: [helpers.root('src')]
      }

    ],

    // An array of automatically applied loaders.
    //
    // IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
    // This means they are not resolved relative to the configuration file.
    //
    // See: http://webpack.github.io/docs/configuration.html#module-loaders
    loaders: [

      // Typescript loader support for .ts and Angular 2 async routes via .async.ts
      //
      // See: https://github.com/s-panferov/awesome-typescript-loader
      { test: /\.ts$/, loaders: [
        'awesome-typescript-loader',
        'angular2-template-loader'
        // '@angularclass/hmr-loader'
        ], exclude: [/\.(spec|e2e)\.ts$/] },

      // See: https://github.com/DragonsInn/fontgen-loader/blob/master/test/webpack.config.js
      // {test: /\.font\.(js|json)$/, loader: 'raw-loader!fontgen?embed'},
      {
        test: /\.font\.json$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style',
          loader: 'css?minimize!fontgen'
        })
      },

      // Json loader support for *.json files.
      //
      // See: https://github.com/webpack/json-loader
      { test: /\.json$/, loader: 'json-loader', exclude: [/\.font\.json$/] },

      {
        test: /(global|\.min)\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style',
          loader: 'css?minimize!postcss'
        })
      },

      // Raw loader support for *.css files
      // Returns file content as string
      //
      // See: https://github.com/webpack/raw-loader
      { test: /\.css$/, loader: 'raw-loader!postcss', exclude: [/(global|\.min)\.css$/] },

      {
        test: /global\.less$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style',
          loader: 'css?minimize!postcss!less'
        })
      },

      { test: /\.less$/, loader: 'raw-loader!postcss!less', exclude: [/global\.less$/] },

      // Raw loader support for *.html
      // Returns file content as string
      //
      // See: https://github.com/webpack/raw-loader
      { test: /\.html$/, loader: 'raw-loader', exclude: [helpers.root('src/index.html')] },

      { test: /\.md$/, loader: 'raw-loader' },

      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          // `file?hash=sha512&digest=hex&name=${helpers.static}[hash].[ext]`,
          `file?hash=sha512&digest=hex&name=${helpers.static}[name]-[hash]`,
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }

    ]

  },

  postcss: [
    autoprefixer({
      browsers: ['last 1 version', '> 10%']
    })
  ],

  // Add additional plugins to the compiler.
  //
  // See: http://webpack.github.io/docs/configuration.html#plugins
  plugins: [

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

    // Plugin: ForkCheckerPlugin
    // Description: Do type checking in a separate process, so webpack don't need to wait.
    //
    // See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
    new ForkCheckerPlugin(),

    // Plugin: CommonsChunkPlugin
    // Description: Shares common code between the pages.
    // It identifies common modules and put them into a commons chunk.
    //
    // See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
    // See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
    new webpack.optimize.CommonsChunkPlugin({
      name: ['lib'].reverse()
    }),

    // Plugin: CopyWebpackPlugin
    // Description: Copy files and directories in webpack.
    //
    // Copies project static assets.
    //
    // See: https://www.npmjs.com/package/copy-webpack-plugin
    new CopyWebpackPlugin([{ from: 'src/assets', to: 'assets' }, { from: 'src/favicon.ico', to: 'favicon.ico' }], { ignore: ['.DS_Store', 'images/**/*', 'i18n/**/*'] }),

    // Plugin: HtmlWebpackPlugin
    // Description: Simplifies creation of HTML files to serve your webpack bundles.
    // This is especially useful for webpack bundles that include a hash in the filename
    // which changes every compilation.
    //
    // See: https://github.com/ampedandwired/html-webpack-plugin
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

    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('./src') // location of oyour src
    )

  ],

  // Include polyfills or mocks for various node stuff
  // Description: Node configuration
  //
  // See: https://webpack.github.io/docs/configuration.html#node
  node: {
    global: 'window',
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
}
