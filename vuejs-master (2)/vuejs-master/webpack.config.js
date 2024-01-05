// @ts-check

const parts = require('./webpack.parts')
const { merge } = require('webpack-merge')
const path = require('path')

const mode = (process.env.NODE_ENV === 'production') ? 'production' : 'development'
if (mode !== 'development' && mode !== 'production') throw new Error('Unknown mode: ' + mode)

const commonConfig = merge([
  {
    entry: {
      app: path.resolve(__dirname, './src/main.ts'),
    },
  },
  parts.output(),
  parts.cache(),
  parts.page(),
  parts.resolve(),
  parts.vue3(),
  parts.code(),
  parts.scss(),
  parts.unocss(),
  parts.assets(),
  parts.define(),
  parts.html(),
  parts.autoimport(),
])

const productionConfig = merge([
  {
    entry: {
      style: path.resolve(__dirname, './src/styles/main.css'),
    },
  },
  parts.extractCss(),
  parts.copy(),
  parts.optimize(),
])

const developmentConfig = merge([
  { devtool: 'eval-source-map' },
  parts.devServer({ port: 4040 }),
])

/**
 * @param {'production' | 'development'} mode
 */
function getConfig(mode) {
  switch (mode) {
    case 'production':
      return merge(commonConfig, productionConfig, { mode })
    case 'development':
      return merge(commonConfig, developmentConfig, { mode })
    default:
      throw new Error(`Trying to use an unknown mode, ${mode}`)
  }
}

module.exports = getConfig(mode)
