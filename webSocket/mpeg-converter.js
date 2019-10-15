const child_process = require("child_process")
const EventEmitter = require("events").EventEmitter;

let mpegMuxer = (options) => {
	let emitter = new EventEmitter();

	emitter._listenEvent = (display) => {
		emitter.stream.stdout.on("data", (data) => {
			if (display === "single") {
				emitter.currentTime += 1;
			}
			emitter.emit(emitter.id + "-data", data);
		})
		emitter.stream.stdout.on("error", (err) => {
			emitter.emit(emitter.id + "-error", err);
		})
		emitter.stream.stderr.on("data", (data) => {
			emitter.emit(emitter.id + "-output", data);
		});
	}

	emitter._startRtspMuxer = () => {
		emitter.stream = child_process.spawn("ffmpeg", ["-rtsp_transport", "tcp", '-r', '25', "-re", "-i", emitter.url, '-threads', '8', '-f', 'h264', '-c:v', 'mpeg1video', '-s', '1920x1080', '-b:v', '1500k', '-preset', 'ultrafast', '-preset', 'zerolatency', '-bf', '0', '-'], {
			detached: false
		});
	}

	emitter._startRtpMuxer = () => {
		emitter.currentTime = 0;
		emitter.lastTime = 0;
		emitter.stream = child_process.spawn("ffmpeg", ['-r', '25', "-i", emitter.url, '-threads', '8', '-f', 'mpegts', '-c:v', 'mpeg1video', '-s', '960x540', '-b:v', '1500k', '-preset', 'ultrafast', '-preset', 'zerolatency', '-bf', '0', '-'], {
			detached: false
		});
	}

	emitter._monitorRtp = () => {
		setInterval(() => {
			if (emitter.currentTime > emitter.lastTime) {
				emitter.lastTime = emitter.currentTime;
			}
			else {
				console.log("restart hangout ffmpeg");
				emitter.stream.stdout.end();
				emitter.stream.kill();
				emitter._startRtpMuxer();
				emitter._listenEvent("single");
			}
		}, 4000);
	}

	emitter.setMaxListeners(0);
	emitter.id = options.id;
	emitter.url = options.url;
	if (options.display === "multiple") {
		emitter._startRtspMuxer();
	} else {
		emitter._startRtpMuxer();
	}

	emitter._listenEvent(options.display);
	return emitter;
}

module.exports = mpegMuxer;