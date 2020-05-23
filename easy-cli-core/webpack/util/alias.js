/**
 * @description: alias相关配置
 *
 * @author: nickLiu
 *
 * @create: 2018-10-29 20:25
 **/
const path = require('path')
module.exports = (dir, type) => {
  let alias = {
    '@': path.join(dir)
  }
  let webpackAlias = {}
  if (type.name === 'vue') {
      webpackAlias.vue = 'vue/dist/vue.js'
  } else if (type.name === 'react') {
      webpackAlias.react = path.join(process.cwd(), '/node_modules/react')
  }
  return Object.assign(alias, webpackAlias)
}
