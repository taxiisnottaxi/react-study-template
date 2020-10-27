const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
// 导入每次删除文件夹的插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 导入抽离css文件的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

module.exports = {
    mode: 'production',
    entry: { // 配置入口节点

        vendors: ['jquery'],  // 把第三方包的名称放到这个数组中
        app: path.join(__dirname, './src/main.js')
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: './js/[name].[hash:8].bundle.js'
    },
    plugins: [ // 插件
        new CleanWebpackPlugin({
            cleanBeforeBuildPatterns: ['dist']
        }),
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html',
            minify: {
                collapseWhitespace: true, // 合并多余的空格
                removeComments: true, // 移除注释
                removeAttributeQuotes: true // 移除属性上的引号
            }
        }),
        new webpack.optimize.SplitChunksPlugin({
            // name: 'vendors', //指定要抽离的入口名称
            // filename: 'vendors.js' // 将来在发布的时候，除了会有一个bundle.js，还会多一个vendors.js的文件，里卖弄存放了所有的第三方包
            chunks: 'all',
            minSize: 0
        }),
        // 目前不起作用
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': '"production"'
        // })
        new MiniCssExtractPlugin({
            filename: './css/[name].[hash:8].bundle.css',
            chunkFilename: './css/[name].[hash:8].bundle.css',
            ignoreOrder: false
        })
    ],
    module: {
        rules: [
            { 
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../' // 用于修正文件路径，在生成的文件前面添加，好像在处理图片引用的时候会有用
                        },
                    },
                    // 'style-loader',
                    'css-loader'
                ]
            },
            { 
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: './css/'
                        },
                    },
                    // 'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            } ,
            { 
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: { limit: 8192 } 
                    }
                ] 
            },
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
        ]
    }
}
