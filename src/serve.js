//引入express中间件
let express = require('express');
let compression = require('compression');
let axios = require('axios');
const http = require('http');
let bodyParser = require("body-parser");
let fromUrl = '';

var app = express();
app.use(compression());
app.use(bodyParser.json());

http.createServer(app).listen(67);

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: __dirname});
  fromUrl = req.headers['referer'];
});

app.get('/*', (req, res) => {
  res.sendFile(req.params[0], {root: __dirname});
});

app.post('/*', (req, res) => {
  let pathName = req.params[0],
    clientIp = req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

  // 转发时带着原请求的ip信息
  req.body.clientIp = clientIp.replace('::ffff:','');
  req.body.fromUrl = fromUrl;

  axios.post(
    'http://39.104.22.73:8888' + pathName.replace('api',''),
    req.body
  ).then(function (response) {
    res.end(JSON.stringify(response.data));
  }).catch(function (e) {
    console.log('转发 ajax error');
  });
});


