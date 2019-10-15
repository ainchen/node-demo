'use strict';

// 默认配置
const defaultConfig = './config-default';
// 测试配置
const testConfig = './config-test';
// 特殊配置
const overrideConfig = './config-override';

let config = {};

if (process.env.NODE_ENV === 'test') {
	console.log(`Load ${testConfig}...`);
	config = require(testConfig);
} else {
	console.log(`Load ${defaultConfig}...`);
	config = require(defaultConfig);
	try {
		if (fs.statSync(overrideConfig).isFile()) {
			console.log(`Load ${overrideConfig}...`);
			config = Object.assign(config, require(overrideConfig));
		}
	} catch (err) {
		console.log(`Cannot load ${overrideConfig}.`);
	}
}

module.exports = config;