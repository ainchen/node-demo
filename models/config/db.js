'use strict';

const Sequelize = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.database, config.username, config.password, {
	host: config.host,
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		idle: 30000
	}
});

let db = Object.assign({}, Sequelize);


db.defineModel = function (name, attr) {
	return sequelize.define(name, Object.assign({
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false
		},
		createdAt: {
			type: Sequelize.BIGINT,
			allowNull: false
		},
		updatedAt: {
			type: Sequelize.BIGINT,
			allowNull: false
		},
		version: {
			type: Sequelize.BIGINT,
			allowNull: false
		}
	}, attr), {
		tableName: name,
		timestamps: false,
		paranoid: true,
		comment: "",
		hooks: {
			beforeValidate: function (obj) {
				let now = Date.now();
				if (obj.isNewRecord) {
					obj.createdAt = now;
					obj.updatedAt = now;
					obj.version = 0;
				} else {
					obj.updatedAt = now;
					obj.version += 1;
				}
			}
		}
	});
}

db.sync = (force) => {
	return sequelize.sync({
		force: force || undefined
	});
}

module.exports = db;