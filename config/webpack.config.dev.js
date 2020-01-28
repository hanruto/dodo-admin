const baseConfig = require('./webpack.config.base')
const webpack = require('webpack')
const path = require('path')


const config = Object.assign(baseConfig, {
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  devServer: {
    hot: true,
    open: true,
    overlay: true,
    port: 8086
  }
})

config.plugins.push(new webpack.HotModuleReplacementPlugin())

module.exports = config
