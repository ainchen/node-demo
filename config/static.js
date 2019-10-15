'use strict';

const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');

module.exports = (url, dir) => {
	return async (ctx, next) => {
		let rpath = ctx.request.path;
		if (rpath.startsWith(url)) {
			let fpath = path.join(dir, rpath.substring(url.length));
			if (await fs.exists(fpath)) {
				ctx.response.type = mime.lookup(rpath);
				ctx.response.body = await fs.readFile(fpath);
			} else {
				ctx.response.status = 404;
			}
		} else {
			await next();
		}
	}
}