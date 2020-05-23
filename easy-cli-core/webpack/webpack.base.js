/**
 * @author nickLiu
 * @description webpack打包基础配置项
 * @createDate 2018-10-4
 * @version webpack version: >= 4.20
 *
 */
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const FixEntryNojsWebpackPlugin = require(
    '../plugins/fix-entry-nojs-webpack-plugin')
const UglifyEsPlugin = require('uglifyes-webpack-plugin')
const {resolve, resolveByDirName, existPath, getTemplateConfig} = require('./util/index')
const createAlias = require('./util/alias')
const merge = require('webpack-merge')
const initPlugins = (dir, entry, dirName, args, type) => {
    const isEnvProduction = process.env.NODE_ENV === 'production'
    let plugins = [
        new MiniCssExtractPlugin({
            filename: 'assets/style/[name].css?[chunkhash:8]',
            chunkFilename: 'assets/style/[name].css?[chunkhash:8]'
        }),
        new webpack.DefinePlugin({
            '__CURRENT_PACKAGE__': JSON.stringify(dirName)
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            _: 'lodash/lodash.min.js',
            moment: 'moment'
        })
    ]
    if (isEnvProduction) {
        plugins.push(new UglifyEsPlugin())
    }
    if (args.copy) {
        let paths = args.copy.split(',')
        let patterns = []
        paths.map(file => {
            if (existPath(path.join(dir, file))) {
                patterns.push({from: file, to: file})
            }
        })
        plugins.push(new CopyWebpackPlugin(patterns, {copyUnmodified: true}))
    }
    if (args.nobuild && entry === args.nobuild) {
        plugins.push(new FixEntryNojsWebpackPlugin())
        return plugins
    }
    plugins.push(new ManifestPlugin())
    plugins.push(new HtmlWebpackPlugin({
        inject: args.nobuild && args.nobuild === entry ? false : true,
        template: existPath(dir + '/' + entry + '.html')
            ? entry + '.html'
            : resolveByDirName('../', '../template/html/index.html')
    }))
    return plugins
}
/**
 * 获取配置
 * @param dir
 * @param dirName
 * @returns module config
 */
const baseConfig = (dir, entry, dirName, type, publicPath, args) => {
    const isEnvProduction = process.env.NODE_ENV === 'production'
    let config = {
        context: dir,
        mode: process.env.NODE_ENV,
        plugins: initPlugins(dir, entry, dirName, args, type)
    }
    if (args.nobuild && dirName === args.nobuild) {
        return Object.assign({}, config, {
            entry: entry,
            output: {
                path: args.batch ? resolve('/dist', '.') + '/' + dirName : resolve(
                    '/dist', '.')
            },
            module: {
                rules: [
                    {
                        test: /\.html$/,
                        use: [
                            {
                                loader: 'file-loader',
                                options: {
                                    name: '[name].[ext]'
                                }
                            }]
                    }]
            },
            resolve: {
                modules: [dir, 'node_modules'],
                extensions: ['.js', '.html']
            }
        })
    }
    return Object.assign({}, config, {
        entry: entry,
        output: {
            path: args.batch ? resolve('/dist', '.') + '/' + dirName : resolve(
                '/dist', '.'),
            filename: '[name].bundle.js?[chunkhash:8]',
            chunkFilename: 'js/[name].bundle.js?[chunkhash:8]',
            publicPath: isEnvProduction ? publicPath + dirName + '/' : args.batch ? publicPath + dirName + '/' : publicPath
        },
        module: {
            rules: [
                {
                    test: /\.json$/,
                    type: 'javascript/auto',
                    loader: 'file-loader',
                    options: {
                        outputPath: 'assets/json',
                        name: '[name].[ext]?[hash:8]',
                        publicPath: isEnvProduction ? publicPath + dirName + '/assets/json/' : args.batch ? publicPath + dirName +
                            '/assets/json/' : publicPath + 'assets/json/'
                    }
                }, {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'assets/img',
                                name: '[name].[ext]?[hash:8]',
                                publicPath: isEnvProduction ? publicPath + dirName + '/assets/img/' : args.batch ? publicPath + dirName +
                                    '/assets/img/' : publicPath + 'assets/img/'
                            }
                        }]
                }, {
                    test: /\.svg$/,
                    use: [
                        '@svgr/webpack',
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'assets/img',
                                name: '[name].[ext]?[hash:8]',
                                publicPath: isEnvProduction ? publicPath + dirName + '/assets/img/' : args.batch ? publicPath + dirName +
                                    '/assets/img/' : publicPath + 'assets/img/'
                            }
                        }]
                }, {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'assets/font',
                                name: '[name].[ext]?[hash:8]',
                                publicPath: isEnvProduction ? publicPath + dirName + '/assets/font/' : args.batch ? publicPath + dirName +
                                    '/assets/font/' : publicPath + 'assets/font/'
                            }
                        }]
                }, {
                    test: /\.bundle\.js$/,
                    use: [
                        {
                            loader: 'bundle-loader',
                            options: {
                                lazy: true
                            }
                        }]
                }, {test: /\.pug$/, loader: 'pug-loader'}
            ]
        },
        resolve: {
            modules: [dir, 'node_modules'],
            alias: createAlias(dir, type, dirName),
            extensions: ['.js', '.jsx', '.less', '.json']
        },
        optimization: {
            splitChunks: {
                chunks: 'async',
                minSize: 1000000,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 5,
                automaticNameDelimiter: '~',
                name: true,
                cacheGroups: {
                    vendor: {// 抽离第三方插件
                        test: /[\\/]node_modules[\\/]/,
                        chunks: 'initial',
                        name: 'vendor',
                        priority: -10 //预留
                    },
                    default: {
                        minChunks: 1,
                        priority: -15,
                        reuseExistingChunk: true
                    }
                }
            }
        }
    })
}

module.exports = (isDev, dir, dirName, args) => {
    let entry = dirName
    // const isEnvDevelopment = process.env.NODE_ENV === 'development'
    let publicPath = args.publicPath ? args.publicPath : '/'
    let data = require(process.cwd() + '/package.json')
    let dependencies = data.dependencies
    let devDependencies = data.devDependencies
    let config = null
    let type = {}
    if (devDependencies.hasOwnProperty('@easy/cli-vue')) {
        type.name = 'vue'
        type.pkgName = '@easy/cli-vue'
        config = require('@easy/cli-vue/config')
    } else if (devDependencies.hasOwnProperty('@easy/cli-react')) {
        type.name = 'react'
        type.pkgName = '@easy/cli-react'
        config = require('@easy/cli-react/config')
    }
    let returnO = merge(baseConfig(dir, entry, dirName, type, publicPath, args), config(
        type,
        publicPath, dirName, args))
    return returnO
}
