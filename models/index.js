'use strict';
/**
 * 自动加载所有model
 * 以及添加配置外键
 */
const fs = require('fs');
const db = require(path_DB);
const modelToModel = require('./modelToModel');

let model = {};

let modelDir = ['/order', '/user', '/system'];

const addModel = (dir) => {
	let files = fs.readdirSync(__dirname + dir);
	let js_files = files.filter((f) => {
		return f.endsWith('.js') && f != 'index.js';
	});
	for (let f of js_files) {
		let name = f.substring(0, f.length - 3);
		model[name] = require(__dirname + dir + '/' + f);
	}
};

for (let d of modelDir) {
	addModel(d);
}

for (let r of modelToModel) {
	if (typeof model[r.from] !== 'undefined' && typeof model[r.to] !== 'undefined') {
		switch (r.relation) {
			case 1: 
				model[r.from].hasOne(model[r.to], {
					as: r.toAs
				});
				model[r.to].belongsTo(model[r.from], {
					as: r.fromAs
				});
				break;
			case 2: 
				model[r.from].hasMany(model[r.to], {
					as: r.toAs
				});
				model[r.to].belongsTo(model[r.from], {
					as: r.fromAs
				});
				break;
			case 3: 
				let name = ('_' + r.table).replace(/_[A-Za-z]/g, (str) => {
					return str.substring(1, str.length).toUpperCase();
				});
				model[name] = db.defineModel(r.table, {});
				model[r.from].belongsToMany(model[r.to], {
					as: r.toAs,
					through: model[name]
				});
				if (r.from != r.to) {
					model[r.to].belongsToMany(model[r.from], {
						as: r.fromAs,
						through: model[name]
					});
				}
				break;
		}
	}
}

model.sync = (force) => {
	return db.sync(force);
};

module.exports = model;