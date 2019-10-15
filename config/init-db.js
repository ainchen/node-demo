'use strict';

const model = require(path_models);

model.sync(process.env.NODE_ENV === 'test').then(() => {
	console.log('init db ok.');
	if (process.env.NODE_ENV === 'test') {
		require(path_root + '/test/db-test');
	}
}, (e) => {
	console.log(`${JSON.stringify(e)}`);
});

module.exports = {};