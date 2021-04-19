const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, './src/main.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    plugins: [ // 插件
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html'
        })
    ],
    module: {
        rules: [
            { 
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            { 
                test: /\.scss$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false,
                            modules: {
                                localIdentName: '[path][name]-[local]-[hash:5]'
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            { 
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: { limit: 8192 } 
                    }
                ] 
            },
            { test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ }
        ]
    }
}
