'use strict';

const CRUD = require(path_CRUD);
const { Menu } = require(path_models);

module.exports = {
	menus: async () => {
		let list = await CRUD.findAll(Menu, {
			order: [['name', 'DESC'], ['url', 'ASC']]
		});
		return list;
	}
}