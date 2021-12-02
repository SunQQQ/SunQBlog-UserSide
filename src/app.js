/**
 * author:sunquan
 *
 * 本文件实现一个静态服务器，对于文件类请求直接响应展示，对于Ajax类请求转发并响应对应数据；
 */

let http = require('http');
let url = require('url');
let util = require('util');
let fs = require('fs');
let mime = require('mime');
let path = require('path');
let axios = require('axios');
let querystring = require('querystring');

let server = http.createServer((req, res) => {
  let pathname = url.parse(req.url).pathname,
    UrlType = pathname.split('/'),    //辨别请求是不是ajax，本应用ajax请求都有aqi标记，具体使用时需要根据情况修改此处
    ProxyedUrl = pathname.replace(/\/api/, 'http://39.104.22.73:8888'),  //指向后后的url
    ext = path.parse(pathname).ext,
    mimeType = mime.getType(ext);

  if (UrlType[1] == 'api') {
    //我的前端请求接口url需要代理，url会添加api，需要将url替换并转发
    let post = '';
    req.on('data', function (chunk) {
      post += chunk;
    });

    req.on('end', function () {
      axios.post(
        pathname.replace(/\/api/, 'http://39.104.22.73:8888'),
        JSON.parse(post)
      ).then(function (response) {
        res.end(JSON.stringify(response.data));
      }).catch(function (e) {
        console.log('ajax error');
      });
    });
  } else if (UrlType[1] == '') {
    ReadAndResponse('index.html',res,mimeType);
  } else {
    ReadAndResponse(pathname.substring(1),res,mimeType);
  }
});

server.listen(67);

/**
 * 读取文件，并在服务中响应对应的文件
 * @param filePath 文件路径
 * @param response 响应对象
 * @param fileType 文件类型
 * @constructor
 */
function ReadAndResponse(filePath,response,fileType){
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // 错误就返回404状态码
      response.writeHead(404, {
        'Content-Type': fileType
      })
    } else {
      // 成功读取文件
      response.writeHead(200, {
        'Content-Type': fileType,
        // 'Content-Encoding': 'gzip'
      });
      // 展示文件数据
      response.write(data);
      // response.setHeader('Content-Encoding', 'gzip');  // 测试
    }
    // 注意，这个end 一定要放在读取文件的内部使用
    response.end();
  });
}
