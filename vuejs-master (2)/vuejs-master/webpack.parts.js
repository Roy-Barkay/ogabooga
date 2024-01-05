// @ts-check

const req = require

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { DefinePlugin } = require('webpack')
const UnoCSS = require('@unocss/webpack').default
/** @type {import('unplugin-auto-import/webpack').default} */
const AutoImportPlugin = req('unplugin-auto-import/webpack')

/** @type {import('unplugin-auto-import/webpack').default} */
// const VueComponents = req('unplugin-vue-components/webpack')

/**
 * @typedef WebpackConfig
 * @type { import('webpack').Configuration }
 */

/**
 * @typedef WebpackDevServerConfig
 * @type { import('webpack-dev-server').Configuration }
 */

/** @type {() => WebpackConfig} */
const resolve = () => ({
  resolve: {
    extensions: [
      '.ts',
      '.vue',
      '.js',
      '.tsx',
    ],
    alias: {
      '@@': path.resolve(__dirname, 'src'),
      '@icons': path.resolve(__dirname, 'src/assets/icons'),
    },
  },
})

/** @type {() => WebpackConfig} */
const output = () => ({
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash:7].js',
    chunkFilename: '[name].[contenthash:7].js',
    assetModuleFilename: 'assets/[name].[contenthash:7][ext]',
    clean: true,
    pathinfo: false,
  },
})

/** @type {() => WebpackConfig} */
const cache = () => ({
  cache: {
    type: 'memory',
  },
})

const devServer = ({ port = 8080 } = {}) => /** @type {WebpackConfig} */ ({
  devServer: /** @type {WebpackDevServerConfig} */ ({
    port,
    hot: true,
    open: true,
    server: 'https',
    static: path.resolve(__dirname, 'public'),
    historyApiFallback: true,
  }),
})

/** @type {() => WebpackConfig} */
const page = () => ({
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
      excludeChunks: /** @type {any[]} */ ([
        /\.css/,
        /\.js/,
      ]),
      template: './index.html',
      minify: {
        minifyCSS: true,
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
})

/** @type {() => WebpackConfig} */
const extractCss = () => ({
  plugins: [
    /** @type {any} */ (new MiniCssExtractPlugin({
      filename: '[name].[contenthash:7].css',
    })),
  ],
})

/** @type {() => WebpackConfig} */
const autoimport = () => ({
  plugins: [
    AutoImportPlugin({
      include: [
        /\.[tj]sx?$/,
        /\.vue$/,
        /\.vue\?vue/,
      ],
      imports: [
        {
          vue: [
            'computed',
            'customRef',
            'defineAsyncComponent',
            'defineComponent',
            'effectScope',
            'getCurrentInstance',
            'getCurrentScope',
            'h',
            'inject',
            'isProxy',
            'isReactive',
            'isReadonly',
            'isRef',
            'markRaw',
            'nextTick',
            'onActivated',
            'onBeforeMount',
            'onBeforeUnmount',
            'onBeforeUpdate',
            'onDeactivated',
            'onErrorCaptured',
            'onMounted',
            'onRenderTracked',
            'onRenderTriggered',
            'onScopeDispose',
            'onServerPrefetch',
            'onUnmounted',
            'onUpdated',
            'provide',
            'reactive',
            'readonly',
            'ref',
            'shallowReactive',
            'shallowReadonly',
            'shallowRef',
            'toRaw',
            'toRef',
            'toRefs',
            'triggerRef',
            'unref',
            'useAttrs',
            'useCssModule',
            'useCssVars',
            'useSlots',
            'watch',
            'watchEffect',
            'watchPostEffect',
            'watchSyncEffect',
          ],
        },
      ],
      dts: 'src/types/auto-imports.d.ts',
    }),
    // VueComponents({
    //   dts: 'src/types/components.d.ts',
    // }),
  ],
})

const copy = () => ({
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'public') },
      ],
    }),
  ],
})

/** @type {() => WebpackConfig} */
const vue3 = () => ({
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              defineModel: true,
              compilerOptions: {
                whitespace: 'condense',
              },
              transformAssetUrls: {
                video: ['src', 'poster'],
                audio: ['src'],
                TIcon: ['src'],
                BaseInput: ['prepend-icon', 'append-icon'],
                TInputText: ['prepend-icon', 'append-icon'],
                TInputMobile: ['prepend-icon', 'append-icon'],
                TInputSelect: ['prepend-icon', 'append-icon'],
                TInputSearch: ['prepend-icon', 'append-icon'],
                TChips: ['icon'],
                img: 'src',
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
})

/** @type {() => WebpackConfig} */
const code = () => {
  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.ts(x)?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
              },
            },
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
          ],
          exclude: /node_modules/,
        },
      ],
    },
  }
}

/** @type {() => WebpackConfig} */

const scss = () => ({
  module: {
    rules: [
      {
        test: /\.s?css$/,
        sideEffects: true,
        use: [
          process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
})

/** @type {() => WebpackConfig} */
const unocss = () => ({
  plugins: [
    UnoCSS(),
  ],
})

/** @type {() => WebpackConfig} */
const assets = () => ({
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|ico|woff2?|ttf)$/,
        type: 'asset',
        parser: { dataUrlCondition: { maxSize: 2000 } },
      },
      {
        test: /\.svg$/,
        type: 'asset/source',
        use: {
          loader: 'svgo-loader',
          options: {
            plugins: [
              { name: 'removeXMLNS', active: true },
              { name: 'removeViewBox', active: false },
              { name: 'cleanupIDs', active: true },
              { name: 'prefixIds', active: true },
              // { name: 'removeDimensions', active: true },
            ],
          },
        },
      },
    ],
  },
})

/** @type {() => WebpackConfig} */
const define = () => ({
  plugins: [
    new DefinePlugin({
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
      VITE: false,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
})

/** @type {() => WebpackConfig} */
const optimize = () => ({
  optimization: {
    runtimeChunk: 'single',
    usedExports: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'initial',
        },
      },
    },
  },
})

/** @type {() => WebpackConfig} */
const html = () => ({
  module: {
    rules: [
      {
        test: /\.htm$/,
        loader: 'html-loader',
      },
    ],
  },
})

module.exports = {
  output,
  devServer,
  cache,
  extractCss,
  page,
  copy,
  resolve,
  vue3,
  code,
  scss,
  assets,
  define,
  optimize,
  html,
  unocss,
  autoimport,
}
