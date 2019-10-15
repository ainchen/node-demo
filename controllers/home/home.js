'use strict';

const { userService, menuService } = require(path_services);
const fs = require('mz/fs');
const path = require('path');

const wss = require(path.join(path_root, './webSocket/apter'));
const sockets = require(path.join(path_root, './webSocket/io'));


const ANDROID = path.join(path_root, './static/test');

const addLayout = async (layout) => {
	if (!layout) {
		return ;
	}
	if (layout['_layout'] && layout['_layout'].length > 0) {
		layout['layout'] = layout['layout'] || [];
		for (let file of layout['_layout']) {
			let fpath = path.join(ANDROID, './' + file['_path']);
			delete file['_path'];
			if (await fs.exists(fpath)) {
				let d = await fs.readFile(fpath, 'utf-8');
				let c = JSON.parse(d);
				for (let k in file) {
					c[k] = file[k];
				}
				layout['layout'].push(c);
			}
		}
		delete layout['_layout'];
		for (let nLayout of layout['layout']) {
			await addLayout(nLayout);
		}
	}
	if (layout['_children'] && layout['_children'].length > 0) {
		layout['children'] = layout['children'] || [];
		for (let file of layout['_children']) {
			let fpath = path.join(ANDROID, './' + file['_path']);
			delete file['_path'];
			if (await fs.exists(fpath)) {
				let d = await fs.readFile(fpath, 'utf-8');
				let c = JSON.parse(d);
				for (let k in file) {
					c[k] = file[k];
				}
				layout['children'].push(c);
			}
		}
		delete layout['_children'];
		for (let nLayout of layout['children']) {
			await addLayout(nLayout);
		}
	}
	if (layout['_page']) {
		let fpath = path.join(ANDROID, './' + layout['_page']['_path']);
		delete layout['_page']['_path'];
		if (await fs.exists(fpath)) {
			let d = await fs.readFile(fpath, 'utf-8');
			layout['page'] = JSON.parse(d);
			for (let k in layout['_page']) {
				layout['page'][k] = layout['_page'][k];
			}
		}
		delete layout['_page'];
		await addLayout(layout['page']);
	}
	if (layout['_shortcut']) {
		let fpath = path.join(ANDROID, './' + layout['_shortcut']['_path']);
		delete layout['_shortcut']['_path'];
		if (await fs.exists(fpath)) {
			let d = await fs.readFile(fpath, 'utf-8');
			layout['shortcut'] = JSON.parse(d);
			for (let k in layout['_shortcut']) {
				layout['shortcut'][k] = layout['_shortcut'][k];
			}
		}
		delete layout['_shortcut'];
	}
}

const home = {
	'get': {},
	'post': {}
};

home['post']['/login'] = async (ctx, next) => {
	console.log(ctx.request.body);
	ctx.rest({
		data: {},
		token: 1
	});
}
home['post']['/login/app'] = async (ctx, next) => {
	ctx.rest({
		data: {},
		token: 1
	});
}

home['get']['/v1/menus/auth'] = async (ctx, next) => {
	console.log(ctx.params);
	let menus = await menuService.menus();
	ctx.rest({
		data: menus
	});
}

home['post']['/v1/op'] = async (ctx, next) => {
	let users = await userService.users();
	ctx.rest({
		data: users
	});
}

home['post']['/login/classCard/V2'] = async (ctx, next) => {
	ctx.rest({
		code: 200,
		token: "c"
	});
}

home['get']['/socket/all'] = async (ctx, next) => {
	let fpath = path.join(path_root, ctx.params.path);
	let layoutJson;
	if (await fs.exists(fpath)) {
		let layout = await fs.readFile(fpath, 'utf-8');
		layoutJson = JSON.parse(layout);
	}
	console.log(JSON.stringify(layoutJson))
	for (let ws of wss) {
		ws.send(JSON.stringify(layoutJson), (err) => {
			if (err) {
				console.log(`[SERVER] error: ${err}`);
			}
		});
	}
	ctx.response.type = 'application/json';
	ctx.response.body = layoutJson;
}

home['post']['/socket/all'] = async (ctx, next) => {
	let fpath = path.join(path_root, ctx.request.body.path);
	let layoutJson;
	if (await fs.exists(fpath)) {
		let layout = await fs.readFile(fpath, 'utf-8');
		layoutJson = JSON.parse(layout);
	}
	console.log(JSON.stringify(layoutJson))
	for (let ws of wss) {
		ws.send(JSON.stringify(layoutJson), (err) => {
			if (err) {
				console.log(`[SERVER] error: ${err}`);
			}
		});
	}
	ctx.response.type = 'application/json';
	ctx.response.body = layoutJson;
}

home['get']['/layout'] = async (ctx, next) => {
	let fpath = path.join(ANDROID, './layout.json');
	if (await fs.exists(fpath)) {
		let layout = await fs.readFile(fpath, 'utf-8');
		let layoutJson = JSON.parse(layout);
		await addLayout(layoutJson);
		let msg = {
			message: {
				data: layoutJson,
				type: 'layout'
			}
		}
		console.log(sockets.length);
		for (let socket of sockets) {
			socket.write(JSON.stringify(msg));
		}
		ctx.response.type = 'application/json';
		ctx.response.body = layoutJson;
	}
}

home['get']['/v1/console/titledata/app/:id'] = async (ctx, next) => {
	let fpath = path.join(path_root, './static/android.json');
	if (await fs.exists(fpath)) {
		let layout = await fs.readFile(fpath, 'utf-8');
		let layoutJson = JSON.parse(layout);
		ctx.response.type = 'application/json';
		ctx.response.body = layout;
	}
}

module.exports = home;