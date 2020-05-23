/**
 * @author nickLiu
 * @description 打生产包相关命令
 * @createDate 2018-12-4
 *
 */
module.exports = {
  opt: {
    description: '打生产包',
    usage: 'easy-cli build [options] [entry]',
    options: {
      '--entry': '单项目打包时的入口JS文件。默认为main(表示src/main.js)',
      '--source': '指定打包时生成sourceMap',
      '--progress': '显示进度'
    }
  },
  fn: (args) => {
    console.log('开始执行生产环境打包...')
    try {
      require.resolve('webpack-cli')
    } catch (err) {
      console.error('缺少 \'webpack-cli\'')
      process.exitCode = 1
    }
    const path = require('path')
    const pkgPath = require.resolve('webpack-cli/package.json')
    const thisPath = path.resolve(__dirname, '../../')
    const pkg = require(pkgPath)
    process.argv.splice(2, 1)
    if (args.batch) {
      process.argv.push('--config')
      process.argv.push(thisPath + '/webpack/batch/webpack.pro.js')
    } else {
      process.argv.push('--config')
      process.argv.push(thisPath + '/webpack/single/webpack.pro.js')
    }
    require(path.resolve(
      path.dirname(pkgPath),
      pkg.bin['webpack-cli']
    ))
  }
}
