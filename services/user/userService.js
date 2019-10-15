'use strict';

const CRUD = require(path_CRUD);
const { User, Menu, Family, Account } = require(path_models);

module.exports = {
	users: async () => {
		// let users = await CRUD.findAll(User, {
		// 	include: [{ model: Menu }]
		// });
		// let users = await CRUD.findAll(Menu, {
		// 	include: [{ model: User }]
		// });
		// let users = await CRUD.findAll(UserMenu);
		// let users = await CRUD.findAll(Family, {
		// 	include: [{ model: User }]
		// });
		let list1 = await CRUD.findAll(Account, {
			include: [{
				model: User,
				as: 'user'
			}]
		});
		let list2 = await CRUD.findAll(User, {
			include: [{
				model: Account,
				as: 'account'
			}]
		});
		
		return [list1, list2];
	}
}