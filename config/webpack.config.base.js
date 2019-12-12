const HtmlWebpackPlugin = require('html-webpack-plugin')
const HappyPack = require('happypack')
const os = require('os') // node 提供的系统操作模块

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

module.exports = {
  entry: ['babel-polyfill', 'react-hot-loader/patch', './src/index.jsx'],
  resolve: {
    extensions: ['.jsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(js|jsx)$/,
        use: [{ loader: 'babel-loader', options: { cacheDirectory: true } }],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: ['url-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      title: 'just dodo',
      favicon: './favicon.ico'
    }),
    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader?cacheDirectory'],
      threadPool: happyThreadPool,
      verbose: true
    })
  ]
}
