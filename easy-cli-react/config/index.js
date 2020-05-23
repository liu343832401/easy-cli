/**
 * @description: react环境相关配置
 *
 * @author: nickLiu
 *
 * @create: 2018-10-15 09:51
 **/
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PnpWebpackPlugin = require('pnp-webpack-plugin')
const postcssNormalize = require('postcss-normalize')
module.exports = (type, publicPath, dirName, args) => {
  const isEnvProduction = process.env.NODE_ENV === 'production'
  const babelConfig = {
    presets: [
      [
        '@babel/preset-env',
        {
          'targets': {
            'esmodules': true
          },
          'forceAllTransforms': isEnvProduction
        }
      ], '@babel/react'],
    plugins: [
      '@babel/transform-runtime',
      ['@babel/plugin-proposal-decorators', {legacy: true}],
      ['@babel/plugin-proposal-class-properties', {loose: true}],
      '@babel/plugin-syntax-dynamic-import',
      [
        'babel-plugin-named-asset-import',
        {
          loaderMap: {
            svg: {
              ReactComponent:
                '@svgr/webpack?-prettier,-svgo![path]'
            }
          }
        }
      ]
    ]
  }
  return {
    module: {
      rules: [
        {parser: {requireEnsure: false}},
        {
          test: /\.(js|mjs|jsx)$/,
          include: [
            path.resolve(process.cwd() + '/src')
          ],
          loader: 'babel-loader',
          options: babelConfig
        },
        {
          test: /\.less$/,
          sideEffects: true,
          use: [
            isEnvProduction
              ? MiniCssExtractPlugin.loader
              : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {}
            }, {
              loader: 'less-loader',
              options: {
                sourceMap: true,
                javascriptEnabled: true
              }
            }]
        },
        {
          test: /\.css$/,
          sideEffects: true,
          use: [
            isEnvProduction
              ? MiniCssExtractPlugin.loader
              : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                //sourceMap: true,
                //modules: true,
                importLoaders: 1,
                localIdentName: '[name]_[local]_[hash:base64:5]'
              }
            }, {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [
                  require('postcss-flexbugs-fixes'),
                  require('postcss-preset-env')({
                    autoprefixer: {
                      flexbox: 'no-2009',
                    },
                    stage: 3,
                  }),
                  postcssNormalize(),
                ]
              }
            }]
        }
      ]
    },
    resolve: {
      extensions: ['.mjs'],
      plugins: [
        PnpWebpackPlugin
      ]
    },
    resolveLoader: {
      plugins: [
        PnpWebpackPlugin.moduleLoader(module)
      ]
    },
    plugins: [
      new webpack.IgnorePlugin(/vertx/)
    ]
  }
}
