/**
 * @description: entry入口去掉js文件
 *
 * @author: nickLiu
 *
 * @create: 2018-12-25 19:41
 **/

const NAME = 'fix-entry-nojs-webpack-plugin'

class FixEntryNojsWebpackPlugin {
  constructor (options) {
    this.apply = this.apply.bind(this)
  }

  apply (compiler) {
    compiler.hooks.compilation.tap(NAME, compilation => {
      compilation.hooks.chunkAsset.tap(NAME, (chunk, file) => {
        if (chunk.hasEntryModule()) {
          let resources
          if (typeof chunk.entryModule.resource === 'string') {
            resources = [chunk.entryModule.resource]
          } else {
            if (
              chunk.entryModule.dependencies &&
              chunk.entryModule.dependencies.length
            ) {
              const modulesWithResources = chunk.entryModule.dependencies
                .map(dep => dep.module)
                .filter(m => m && m.resource)
              resources = modulesWithResources.map(m => m.resource)
            }
          }

          if (resources && resources.length) {
            if (file.endsWith('.js')) {
              chunk.files = chunk.files.filter(f => f !== file)
              delete compilation.assets[file]
            }
          }
        }
      })
    })
  }
}

module.exports = FixEntryNojsWebpackPlugin
