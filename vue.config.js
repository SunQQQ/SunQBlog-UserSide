module.exports = {
  baseUrl:'./',
  outputDir:'blog-user',
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
  },
  // 包分析工具，可看到各种资源的体积
  // chainWebpack:config=>{
  //   config
  //     .plugin('webpack-bundle-analyzer')
  //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
  // },
  productionSourceMap: false, // 关闭map文件的生成，map文件保存映射保证在程序报错时能找到资源文件
  configureWebpack:config=>{
    // GZip压缩
    const CompressionPlugin = require('compression-webpack-plugin');
    // build时关闭console、debugger
    const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
    config.plugins.push(
      new CompressionPlugin({
        algorithm:'gzip',
        test:/\.(js|css|woff|woff2|svg)$/,  // 要压缩的文件
        threshold:10240, // 压缩超过10k的数据
        deleteOriginalAssets:false, // 不删除压缩前的文件，如果浏览器不支持Gzip，则会加载源文件
        minRatio:0.8 // 压缩比大于0.8的文件将不会被压缩
      })
    );

    config.plugins.push(
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_debugger: true,//关闭debug
            drop_console: true,//关闭console
          }
        },
      })
    );
  }
};
