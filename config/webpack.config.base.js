const path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/'],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'main.js'
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader',
          options: { sourceMap: true }
        }, 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              sourceMap: true,
            }
          }]
      },
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
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
    })
  ]
}