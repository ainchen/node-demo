const RtspClient = require("rtsp-h264");
var EventEmitter = require("events").EventEmitter

let rtspConverter = (options) => {
	let emitter = new EventEmitter();

	emitter.setMaxListeners(0);
	emitter.id = options.id;
	emitter.url = options.url;
	// let user = options.url.replace(/^rtsp:\/\//, '').replace(/\@[0-9A-Za-z\/\.\:]+/, '');
	// let username = user.split(':')[0];
	// let password = user.split(':')[1];
	let username = "admin";
	let password = "123456";
	emitter.client = new RtspClient({ id: emitter.id, url: emitter.url, username: username, password: password });
	emitter.client.start();
	emitter.client.on("frames", (data) => {
		console.log('frames success');
		emitter.emit(`${emitter.id}-data`, data);
	});
	emitter.client.on("error", (err) => {
		console.log('frames error')
		emitter.emit(`${emitter.id}-err`, err);
	});
	return emitter;
}

module.exports = rtspConverter;