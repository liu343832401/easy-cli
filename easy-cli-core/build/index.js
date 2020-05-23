/**
 * @author nickLiu
 * @description nodejs 配置 （生产包配置）
 * @createDate 2018-10-4
 *
 */
process.env.NODE_ENV = 'production'

const ora = require('ora')
const chalk = require('chalk')
const webpack = require('webpack')
const webpackConfig = require('../webpack/batch/webpack.pro')

const spinner = ora('开始打生产包...')
spinner.start()

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  if (stats.hasErrors()) {
    console.log(chalk.red('打包时遇到错误.\n'))
    process.exit(1)
  }
  console.log(chalk.cyan('打包完成.\n'))
})
