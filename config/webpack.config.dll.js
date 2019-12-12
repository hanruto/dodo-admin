const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    lib: ['react', 'mobx', 'mobx-react', 'braft-editor', 'recharts']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': '"production"'
    }),
    new webpack.DllPlugin({
      context: __dirname,
      path: path.resolve(__dirname, '../dll', 'lib.manifest.json'),
      name: '[name]_library'
    })
  ]
}
