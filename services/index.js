'use strict';

const fs = require('fs');

let service = {};

let serviceDir = ['/user', '/system'];

const addService = (dir) => {
	let files = fs.readdirSync(__dirname + dir);
	let js_files = files.filter((f) => {
		return f.endsWith('.js') && f != 'index.js';
	});
	for (let f of js_files) {
		let name = f.substring(0, f.length - 3);
		service[name] = require(__dirname + dir + '/' + f);
	}
};

for (let d of serviceDir) {
	addService(d);
}

module.exports = service;