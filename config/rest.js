'use strict';

module.exports = {
	APPError: function (code, message) {
		this.code = code || 999;
		this.message = message || "";
	},
	restify: (url) => {
		return async (ctx, next) => {
			let rpath = ctx.request.path;
			if (rpath.startsWith(url)) {
				ctx.rest = (data, message) => {
					ctx.response.type = 'application/json';
					ctx.response.body = Object.assign({
						code: 200,
						message: ""
					}, data);
				};
				try {
					await next();
				} catch (e) {
					ctx.response.status = 400;
					ctx.response.type = 'application/json';
					ctx.response.body = {
						code: e.code || 0,
						message: e.message || ""
					};
				}
			} else {
				await next();
			}
		}
	}
};
