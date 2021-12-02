//引入express中间件
var express = require('express');
var compression = require('compression');
let axios = require('axios');
const http = require('http');
var bodyParser = require("body-parser");

var app = express();
app.use(compression());
app.use(bodyParser.json());

http.createServer(app).listen(67);

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: __dirname});
});

app.get('/*', (req, res) => {
  res.sendFile(req.params[0], {root: __dirname});
});

app.post('/*', (req, res) => {
  let pathName = req.params[0],
    paramType = pathName.split('/')[0];
  axios.post(
    'http://39.104.22.73:8888' + pathName.replace('api',''),
    req.body
  ).then(function (response) {
    res.end(JSON.stringify(response.data));
  }).catch(function (e) {
    console.log('ajax error');
  });
});


