const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const config = Object.assign(baseConfig, {
  mode: 'production',
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        tool: {
          name: 'tool',
          test: module => /lodash|dayjs|axios/.test(module.context),
          priority: 11,
          chunks: 'all',
          enforce: true
        },
        react: {
          name: 'react',
          test: module => /react|redux/.test(module.context), // 打包react和redux相关的一些第三方包
          chunks: 'initial',
          priority: 10,
          enforce: true
        },
        vender: {
          name: 'vender',
          test: module => /node_modules/.test(module.context),
          chunks: 'initial',
          priority: 9,
          enforce: true
        }
      }
    }
  },
})

const cleanPlugin = new CleanWebpackPlugin()
const dllReferencePlugin = new webpack.DllReferencePlugin({
  context: __dirname,
  manifest: require('../dll/lib.manifest.json')
})

config.plugins.push(cleanPlugin, dllReferencePlugin)

module.exports = config
