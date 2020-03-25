module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {  // 代理方式 target 为后台开发环境地址, 上测试,生产后无需更改.
      '/api': { // 代理目的:解决跨域
        target: 'http://mall-pre.springboot.cn',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    },
    overlay: { // 关闭 eslint校验
      warnings: false,
      errors: false
    }
  },
  lintOnSave: false, // 关闭 eslint校验
  // publicPath:'/app',
  // outputDir:'dist',
  // indexPath:'index2.html',
  // lintOnSave:false,
  productionSourceMap: true,
  chainWebpack: (config) => {   //删除预加载-真正按需
    config.plugins.delete('prefetch');
  }
}