/**
 * @author nickLiu
 * @description 命令解析
 * @createDate 2018-12-4
 *
 */
const build = require('./commands/build')
const serve = require('./commands/serve')
module.exports = class Service {
  constructor () {
    this.commands = { 'build': build, 'serve': serve}
  }
  async run (name, args = {}) {
    args._ = args._ || []
    let command = this.commands[name]
    if (!command && name) {
      error(`"${name}" 不存在此命令.`)
      process.exit(1)
    }
    args._.shift() // remove command itself
    const { fn } = command
    return fn(args)
  }
}
