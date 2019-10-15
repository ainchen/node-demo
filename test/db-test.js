'use strict';

const CRUD = require(path_CRUD);
const MODEL = require(path_models);

let table = ['Account', 'User', 'Menu', 'Family', 'Pet']

let data = {
		User: [{
				name: '张三',
				age: 18,
				account: {
					username: 'u1',
					password: 'p1'
				},
				family: {
					name: '张家',
					address: '糙米纳斯脑残女uwinc'
				},
				menus: [{
					name: '测试',
					url: '1'
				}, {
					name: '自己',
					url: 'self'
				}]
			}, {
				name: '历史',
				age: 99,
				account: {
					username: 'u2',
					password: 'p2'
				},
				family: {
					name: '林觉寺',
					address: 'l了每次我昵称'
				}
			}, {
				name: '户外群',
				age: 43,
				family: {
					name: '林觉寺',
					address: 'l了每次我昵称'
				}
			}],
		Family: [{
			name: '宠物之家',
			address: 'llhh南次卧',
			pets: [{
				name: '咪咪',
				age: 3
			}, {
				name: '咕咕',
				age: 1
			}, {
				name: '哇哇',
				age: 1.5
			}]
		}]
	};

let relation = {
	User: {
		include: [{
			model: MODEL['Account'],
			as: 'account'
		}, {
			model: MODEL['Family'],
			as: 'family'
		}, {
			model: MODEL['Menu'],
			as: 'menus'
		}]
	},
	Family: {
		include: [{
			model: MODEL['Pet'],
			as: 'pets'
		}]
	}
};

(async (table, data) => {
	for (let t of table) {
		for (let d of (data[t] || [])) {
			await CRUD.create(MODEL[t], d, relation[t]);
		}
	}
})(table, data);