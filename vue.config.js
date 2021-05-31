module.exports = {
  baseUrl:'./',
  devServer: {
    // 设置代理
    proxy: {
      '/api': {
        //target: 'http://localhost:8888/', // 开发环境下使用
        target: 'http://121.5.115.202:8888/', // 生产环境下需要根据实际情况修改
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
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
