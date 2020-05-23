/**
 * @description:生产包相关配置
 *
 * @author: nickLiu
 *
 * @create: 2018-10-14 11:40
 **/
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyEsPlugin = require('uglifyes-webpack-plugin')
const path = require('path')
const getBaseConfig = require('../webpack.base.js')
const rawArgv = process.argv.slice(2)
const args = require('minimist')(rawArgv, {
})
process.env.NODE_ENV = 'production'
const merge = require('webpack-merge')
module.exports = []
let dir = 'src'
let dirName = args.entry ? args.entry : 'main'
module.exports =
  merge(getBaseConfig(false, path.join(process.cwd(), dir), dirName, args), {
    devtool: args.source ? args.source : 'none',
    plugins: [
      new CleanWebpackPlugin(['dist'], {
        root: process.cwd(),
        verbose: true,
        dry: false
      }),
      new UglifyEsPlugin({
        sourceMap: true
      })
    ]
  })
