'use strict';

const fs = require('fs');

const addController = (router, dir) => {
	const files = fs.readdirSync(__dirname + dir);
	const controllers = files.filter((item) => {
		return item.endsWith('.js') && item != 'index.js';
	});
	for (let fileName of controllers) {
		let controller = require(__dirname + dir + '/' + fileName);
		for (let method in controller) {
			for (let path in controller[method]) {
				router[method](path, controller[method][path]);
			}
		}
	}
}

module.exports = () => {
	const router = require('koa-router')();
	addController(router, '/home');
	// addController(router, '/order');
	return router.routes();
};