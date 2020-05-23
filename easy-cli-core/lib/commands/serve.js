/**
 * @author nickLiu
 * @description 打开发包相关命令
 * @createDate 2018-12-4
 *
 */
module.exports = {
  opt: {
    description: 'start development server',
    usage: 'easy-cli serve [options] [entry]',
    options: {
      '--port': '启动端口， example:8080.默认8080`',
      '--entry': '单项目打包时的入口JS文件。默认为main(表示src/main.js)',
      '--public': '浏览器访问路径',
      '--progress': '显示进度'
    }
  },
  fn: (args) => {
    console.info('开始执行开发环境打包...')
    try {
      require.resolve('webpack-dev-server')
    } catch (err) {
      console.error('缺少 \'webpack-dev-server\'')
      process.exitCode = 1
    }
    const path = require('path')
    const pkgPath = require.resolve('webpack-dev-server/package.json')
    const thisPath = path.resolve(__dirname, '../../')
    const pkg = require(pkgPath)
    process.argv.splice(2, 1)
    if (args.batch) {
      process.argv.push('--config')
      process.argv.push(thisPath + '/webpack/batch/webpack.dev.js')
    } else {
      process.argv.push('--config')
      process.argv.push(thisPath + '/webpack/single/webpack.dev.js')
    }
    require(path.resolve(
      path.dirname(pkgPath),
      typeof pkg.bin === 'object' ? pkg.bin['webpack-dev-server'] : pkg.bin
    ))
  }
}
