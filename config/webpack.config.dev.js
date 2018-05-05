const path = require('path'),
    webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: ['babel-polyfill', './src/'],
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'main.js'
    },
    devtool: 'cheap-source-map',
    devServer: {
        hot: true,
        inline: true,
        open: true,
        overlay: true
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
        new webpack.HotModuleReplacementPlugin()
    ]
}