require('./globals');

const http = require('http');
const express = require('express');
const _ = require('lodash');
//const weappSession = require('weapp-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('./config');
const net = require('net');
const cors = require('cors');
const redis = require('./libs/redis');
const co = require('co');
var sensorVal;

const app = express();

app.set('query parser', 'simple');
app.set('case sensitive routing', true);
app.set('jsonp callback name', 'callback');
app.set('strict routing', true);
app.set('trust proxy', true);

//app.disable('x-powered-by');

// 记录请求日志
app.use(morgan('dev'));

// parse `application/x-www-form-urlencoded`
app.use(bodyParser.urlencoded({ extended: true }));

// parse `application/json`
app.use(bodyParser.json());

app.use(cors());

app.use(function (req, res, next) {
    var url = req.originalUrl;
   	var urlPattern=/admin*/;

//  if(!urlPattern.test(url)){ 
//      return res.json({ statusCode: 403, msg: 'forbidden', error: {}});
//  }
    next();
});

app.use(require('./middlewares/route_dispatcher'));

// 打印异常日志
process.on('uncaughtException', error => {
    console.log(error);
});

// 启动server
http.createServer(app).listen(config.port, () => {
    console.log('Express server listening on port: %s', config.port);
});
