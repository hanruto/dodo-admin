const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    lib: ['react', 'mobx', 'mobx-react', 'braft-editor', 'recharts']
  },
  output: {
    path: path.resolve(__dirname, '../dll'),
    filename: '[name].js',
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      path: path.resolve(__dirname, '../dll', 'manifest.json'),
      name: '[name]_[hash]',
    })
  ]
}
