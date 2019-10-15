'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
const fs = require('fs');
const path = require('path');
const https = require('https');

require('./config/path');
const webSocket = require('./webSocket');
// const socket = require('./webSocket/socket');
const controllers = require('./controllers');
const static_dir = require('./config/static');
const restify = require('./config/rest').restify;
const time = require('./config/time');
console.log(path_root);

const app = new Koa();
const server = require('http').createServer(app.callback());
// socket(server);

// 收到请求
app.use(async (ctx, next) => {
	console.log(`process ${ctx.request.method}: ${ctx.request.url} ${time()}`);
	await next();
});

// 跨域配置
app.use(cors({
	origin: '*'
}));

// 静态资源
app.use(static_dir('/static/', path.join(__dirname, './static')));

// 接口数据格式化
app.use(restify('/login'));
app.use(restify('/exit'));
app.use(restify('/v1'));

// 
app.use(bodyParser());

// 接口配置
app.use(controllers());

// 首页
app.use(async (ctx, next) => {
	ctx.response.type = 'text/html';
	ctx.response.body = fs.readFileSync(path.join(__dirname, './index.html'));
});

const servers = https.createServer({
	key: fs.readFileSync('./ssl/2_ainchen.cn.key'),
	cert: fs.readFileSync('./ssl/1_ainchen.cn_bundle.crt')
}, app.callback());

servers.listen('443');

// websocket
webSocket(server);
webSocket(servers);

// new rtsp.StreamingMediaServer(server);

// 运行模式
process.env.NODE_ENV = "tes-t";

// 数据库初始化
server.listen('80', () => {
	require('./config/init-db');
	console.log('service runing in http://localhost:80');
});


// const websocket = new WebSocket("ws://localhost:3001?url=rtsp://admin:hik12345@192.168.90.183:554");
// const websocket = new WebSocket("ws://localhost:3001/hhhhhh?addr=rtsp://192.168.80.75:7964/777");


// websocket.on("open", () => {
// 	console.log(`[CLIENT] open()`);
// 	websocket.send('hello');
// });

// websocket.on('message', (message) => {
// 	console.log(`[CLIENT] Received: ${message}`);
// })

// var net = require('net');
// var s = net.createServer(function (socket) {
// 	console.log('server connected');
// 	socket.on('data', function (d) {
// 		console.log(d);
// 		data = d.toString('utf8').trim();
// 		var cmd_re = /^(\d{2})+[ ]*(.*)/g;
// 		cmd_match = cmd_re.exec(data)
// 		if (cmd_match) {
// 			var command = cmd_match[1];
// 			var args = cmd_match[2];
// 			console.log(command + " " + args);
// 		}
// 	});

// 	socket.on('end', function () {
// 		console.log('server disconnected');
// 	});

// 	socket.on('error', function (ex) {
// 		console.log("ignoring exception: " + ex);
// 	});

// });
// s.listen(2345);