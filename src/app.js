// require这些东西都是调用node环境中的包，只要有node环境，这些require的模块都是默认被安装进去了，就可以直接这样写
// node支持ES6的写法，下面的就是ES6的写法，不需要额外使用插件来把ES6转ES5，很方便

let http = require('http');
let url = require('url');
let util = require('util');
let fs = require('fs');
var mime = require('mime');
var path = require('path');
var axios = require('axios');
var querystring = require('querystring');

// http库是node提供的api，可以直接上node的中文网，直接看到各种api
let server = http.createServer((req, res) => {
  var pathname = url.parse(req.url).pathname;
  var UrlType = pathname.split('/');    //辨别请求是不是ajax，本应用ajax请求都有aqi标记，具体使用时需要根据情况修改此处

  if (UrlType[1] == 'api') {
    var post = '';
    // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    req.on('data', function(chunk){
      post += chunk;
    });

    req.on('end', function(){

    });

    axios.post(
      pathname.replace(/\/api/, 'http://39.104.22.73:8888'),
      {Skip: 0, Limit: 8}
    ).then(function (response) {
      console.log('response');
      console.log(response);
    }).catch(function (e) {
      console.log('ajax error');
      console.log(e);
    });

  } else {
    var ext = path.parse(pathname).ext;
    // 获取后缀对应的 MIME 类型
    var mimeType = mime.getType(ext);

    // fs，文件系统，读取文件
    fs.readFile(pathname.substring(1), (err, data) => {
      if (err) {
        // 错误就返回404状态码
        res.writeHead(404, {
          'Content-Type': mimeType
        })
      } else {
        // 成功读取文件
        res.writeHead(200, {
          'Content-Type': mimeType
        })
        // 展示文件数据
        res.write(data.toString());
      }
      // 注意，这个end 一定要放在读取文件的内部使用
      res.end();
    })
  }
})

server.listen(67);
