const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    lib: ['react', 'mobx', 'mobx-react', 'braft-editor', 'recharts']
  },
  output: {
    path: path.resolve(__dirname, '../dist/dll'),
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      path: path.resolve(__dirname, '../dist/dll', 'lib.manifest.json'),
      name: '[name]_library'
    })
  ]
}
