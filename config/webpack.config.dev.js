const baseConfig = require('./webpack.config.base')
const webpack = require('webpack')


const config = Object.assign(baseConfig, {
  mode: 'development',
  devServer: {
    hot: true,
    open: true,
    overlay: true,
    port: 8081,
  },
})

config.plugins.push(new webpack.HotModuleReplacementPlugin())

module.exports = config
