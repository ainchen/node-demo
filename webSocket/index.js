'use strict';

const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;
const apter = require('./apter');
// const url = require('url');
// const mpegMuxer = require("./mpeg-converter");
// const querystring = require('querystring');


module.exports = (server) => {
	let wss = new WebSocketServer({
		server: server
	});

	let CLIENTS = {};
	let PROC = {};
	let THRESHOLD = 16;

	wss.on('connection', (ws, req) => {
		apter.push(ws);
		console.log(`[SERVER] connection()`);
		ws.on('message', (message) => {
			console.log(`[SERVER] Received: ${message}`);
			ws.send(`${message}`, (err) => {
				if (err) {
					console.log(`[SERVER] error: ${err}`);
				}
			})
		})

		// var name = url.parse(req.url).pathname;
		// var arg = url.parse(req.url).query;
		// var params = querystring.parse(arg);
		// var rtspAddr = params.addr;
		// var display = params.method;
		// if (!name || !arg || !rtspAddr) {
		// 	console.log(`requested url ${req.url} is error`);
		// 	return;
		// }
		// else
		// 	console.log(`requested url is ${req.url}`);


		// if (!(rtspAddr in CLIENTS)) {
		// 	console.log("client for new channel");
		// 	CLIENTS[rtspAddr] = [ws]
		// 	//create a child_process to convert video type
		// 	var muxer = mpegMuxer({ id: name, url: rtspAddr, display: display });
		// 	PROC[rtspAddr] = muxer;
		// 	muxer.on(name + "-data", (data) => {
		// 		CLIENTS[rtspAddr] = CLIENTS[rtspAddr].filter((ele) => ele.readyState === WebSocket.OPEN)
		// 		// console.log(Buffer.from(data, 'hex'));
		// 		CLIENTS[rtspAddr].forEach((client) => {
		// 			client.send(data);
		// 		})
		// 	});
		// 	muxer.on(name + "-error", (err) => {
		// 		console.log(`the error happend for ${name} : ${err}`)
		// 	});
		// 	muxer.on(name + "-output", (output) => {
		// 		console.log(`the output for ${name} : ${output}`)
		// 	})

		// }
		// else {
		// 	console.log("client for existing channel");
		// 	CLIENTS[rtspAddr].push(ws);
		// }
		// ws.on("close", () => {
		// 	console.log("connection is closed");
		// 	CLIENTS[rtspAddr] = CLIENTS[rtspAddr].filter((ele) => ele.readyState === WebSocket.OPEN)
		// 	//close no connected process
		// 	Object.keys(CLIENTS).forEach((rtsp) => {
		// 		if (Object.keys(CLIENTS).length > THRESHOLD && CLIENTS[rtsp].length === 0) {
		// 			console.log("there are no socket listening " + rtsp);
		// 			PROC[rtsp].stream.stdout.end();
		// 			PROC[rtsp].stream.kill();
		// 			delete PROC[rtsp];
		// 			delete CLIENTS[rtsp];
		// 		}

		// 	});
		// });
		// ws.on('error', (err) => {
		// 	console.log(`${err} happened for connection`);
		// });

	});
}