const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // options
  publicPath: '/',

  outputDir: 'dist',
  indexPath: 'index.html',
  lintOnSave: process.env.NODE_ENV === 'development',

  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,

  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    // name: '', // webpackConfig.name
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },

  pluginOptions: {
    express: {
      shouldServeApp: true,
      serverDir: './dist'
    }
  }
}
