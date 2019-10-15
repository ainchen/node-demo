const Service = require('node-windows').Service;

let svc = new Service({
	name: 'svc 网络服务',
	descripton: '网络服务',
	script: './app.js',
	wait: '2',
	grow: '0.2',
	maxRestarts: '20'
});

svc.on('install', () => {
	svc.start();
	console.log('svc install');
});

svc.on('uninstall', () => {
	console.log('svc uninstall', svc.exists);
});

svc.on('alreadyinstalled', () => {
	console.log('already installed');
});

if (!svc.exists) {
	svc.install();
} else {
	svc.uninstall();
}