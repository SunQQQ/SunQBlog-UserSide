module.exports = {
  baseUrl:'./',
  devServer: {
    // 设置代理
    proxy: {
      '/api': {
        // target: 'http://localhost:8888/', // 开发环境下使用
        target: 'http://39.104.22.73:8888/', // 生产环境下需要根据实际情况修改
        changeOrigin: true, //改变源
        pathRewrite: {
          '^/api': '' //路径重写
        },
        pathRequiresRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
