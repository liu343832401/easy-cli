/**
 * @description:工具类
 *
 * @author: nickLiu
 *
 * @create: 2018-10-29 19:05
 **/
const path = require('path')
const fs = require('fs')
const glob = require('glob')

module.exports = {
  resolve: (dir, owner = '../..') => {
    let join = path.join(process.cwd(), owner, dir)
    return join
  },
  resolveByDirName: (owner = './', dir) => {
    let join = path.join(__dirname, owner, dir)
    return join
  },
  existPath: (path) => {
    return fs.existsSync(path)
  },
  /**
   * 同步获取文件或目录
   * @param pattern
   * @returns {*}
   */
  getFiles: (pattern) => {
    return glob.sync(pattern)
  },
  getTemplateConfig: (path) => {
    if (!fs.existsSync(path)) {
      return null
    }
    let htmlText = fs.readFileSync(path, 'utf8')
    let headChild = htmlText.match(/(<head>[\s\S]*<\/head>)/)[0]
    let bodyChild = htmlText.match(/(<body>[\s\S]*<\/body>)/)[0]
    if (headChild) {
      headChild = headChild.replace(/(<head>)|(<\/head>)|(\/n)/g, '')
    }
    if (bodyChild) {
      bodyChild = bodyChild.replace(/(<body>)|(<\/body>)|(\/n)/g, '')
    }
    return (compilation, assets, assetTags, options) => {
      const xhtml = options.xhtml
      assetTags.headTags.toString = function () {
        return this.map(
          (assetTagObject) => htmlTagObjectToString(assetTagObject, xhtml))
          .join('')
      }
      assetTags.bodyTags.toString = function () {
        return this.map(
          (assetTagObject) => htmlTagObjectToString(assetTagObject, xhtml))
          .join('')
      }
      return {
        compilation: compilation,
        webpackConfig: compilation.options,
        htmlWebpackPlugin: {
          tags: assetTags,
          files: assets,
          options: options,
          headChild: headChild,
          bodyChild: bodyChild
        }
      }
    }
  }
}
