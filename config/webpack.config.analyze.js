const prodConfig = require('./webpack.config.prod')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

prodConfig.plugins.push(new BundleAnalyzerPlugin())

module.exports = prodConfig