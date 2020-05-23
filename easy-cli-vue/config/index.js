/**
 * @description: 配置
 *
 * @author: nickLiu
 *
 * @create: 2018-10-15 09:51
 **/
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = (type, publicPath) => {
  return {
    module: {
      rules: [
        {
          test: /\.js[x]?$/,
          include: [
            path.resolve(process.cwd() + '/src')
          ],
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
            plugins: ['@babel/transform-runtime', '@babel/plugin-syntax-dynamic-import', '@babel/plugin-syntax-jsx', 'transform-vue-jsx']
          }
        },
        {
          test: /\.(le|c)ss$/,
          sideEffects: true, // @nickLiu：和package的sideEffects区分，否则会将css文件删除
          use: [
            process.env.NODE_ENV === 'production'
              ? MiniCssExtractPlugin.loader
              : 'vue-style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            }, {
              loader: 'less-loader',
              options: {
                sourceMap: true,
                javascriptEnabled: true
              }
            }]
        },
        {
          test: /\.vue$/,
          use: [
            {
              loader: 'vue-loader'
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.vue']
    },
    plugins: [
      new VueLoaderPlugin()
    ]
  }
}
