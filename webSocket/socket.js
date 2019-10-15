'use strict';

const list = require('./io');
var net = require('net');
var s = net.createServer(function (socket) {
	console.log('server connected');
	list.push(socket);
	socket.on('data', function (d) {
		console.log(d);
		// data = d.toString('utf8').trim();
		// var cmd_re = /^(\d{2})+[ ]*(.*)/g;
		// cmd_match = cmd_re.exec(data)
		// if (cmd_match) {
		// 	var command = cmd_match[1];
		// 	var args = cmd_match[2];
		// 	console.log(command + " " + args);
		// }
	});

	socket.on('end', function () {
		console.log('server disconnected');
	});

	socket.on('error', function (ex) {
		console.log("ignoring exception: " + ex);
	});

});
s.listen(2345);

module.exports = (server) => {
	// const io = require('socket.io')(server);
	// io.on('connection', (socket) => {
	// 	console.log(socket);
	// 	list.push(socket);
	// 	socket.on('chat message', (msg) => {
	// 		console.log('message: ' + msg);
	// 		io.emit('chat message', msg);
	// 	});
	// 	socket.on('disconnect', () => {
	// 		console.log('user disconnected');
	// 		list.splice(list.indexOf(socket), 1);
	// 	});
	// });
}