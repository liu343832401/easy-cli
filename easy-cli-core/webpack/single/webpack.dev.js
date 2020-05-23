/**
 * @description:开发环境相关配置
 *
 * @author: nickLiu
 *
 * @create: 2018-10-14 11:40
 **/
process.env.NODE_ENV = 'development'
const path = require('path')
const getBaseConfig = require('../webpack.base.js')
const merge = require('webpack-merge')
const rawArgv = process.argv.slice(2)
const args = require('minimist')(rawArgv, {
})
module.exports = []
let port = args.port ? args.port : 8080
let dir = 'src'
let dirName = args.entry ? args.entry : 'main'
module.exports = merge(getBaseConfig(true, path.join(process.cwd(), dir), dirName, args),
  {
    devtool: '#cheap-module-eval-source-map',
    devServer: {
      port: port,
      public: args.public ? args.public : 'localhost:' + port,
      publicPath: '/',
      historyApiFallback: true,
      staticOptions: {
        redirect: false
      },
      disableHostCheck: true
    }
  })
