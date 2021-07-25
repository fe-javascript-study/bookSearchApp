const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require("path")

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash].[ext]'
                }
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'development',
            favicon: './asset/favicon.ico',
            template: './src/index.html',
            chunks: ['css', 'index', 'app', 'system', 'monitor']
        })
    ],
    devServer: {
        host: 'localhost',
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        hot: true,
        inline: true,
        port: 3000,
        open: true
    }
}
