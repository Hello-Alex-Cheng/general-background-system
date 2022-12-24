// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    // 配置反向代理
    proxy: {
      // 当地址中有/api的时候会触发代理机制
      '/api': {
        // 要代理的服务器地址  这里不用写 api
        // target: 'https://jsonplaceholder.typicode.com/',
        target: 'http://localhost:9999',
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          // 必须得带上,否则，整整的请求中就会带上 '/api'，'https://jsonplaceholder.typicode.com/api/users/1'
          '^/api': ''
        }
      }
    }
  },
  chainWebpack(config) {
    // 使用了 config.module.rule('svg') 方法来获取对 SVG 文件的处理规则。
    // 然后，它使用了 exclude 属性来添加一个排除规则，这个规则会排除 resolve('src/icons') 目录中的所有文件。
    // 最后，它使用了 end 方法来结束这个链式调用。
    // 这段代码的作用是在 Webpack 构建流程中排除 src/icons 目录中的所有 SVG 文件。这意味着 Webpack 在构建时不会处理这些文件。
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()

    // 使用了 config.module.rule('icons') 方法来获取对图标文件的处理规则。
    // 然后，它使用了 test 属性来设置这个规则应用于哪些文件，这里使用的是一个正则表达式，表示只有以 .svg 结尾的文件才会被处理。
    // 接着，它使用了 include 属性来添加一个包含规则，这个规则只会包含 resolve('src/icons') 目录中的文件。
    // 最后，它使用了 use 方法来添加一个新的规则，这个规则使用了 svg-sprite-loader 来处理 SVG 文件。

    // 这段代码的作用是在 Webpack 构建流程中处理 src/icons 目录中的 SVG 文件。
    // 它会使用 svg-sprite-loader 加载器来将这些 SVG 文件转换为可以在浏览器中使用的精灵图（Sprite）。
    // 精灵图是一种将多个图标放在一张图片中的技术，可以减少 HTTP 请求数，提升网站性能。

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
