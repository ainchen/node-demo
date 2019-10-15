'use strict';

/**
 * 
(async () => {
	let list1 = await CRUD.findAll(User);
	console.log(list1);
	let item1 = await CRUD.findItem(User, {
		// 查询列
		attributes: ['foo', ['bar', 'A']],
		// 筛选
		where: {
			age: 99
		},
		// 外键引入
		include: [{
			model: Task,
			where: {}
		}]
		// 分页
		offset: 0,
		limit: 10,
		// 排序
		order: [['name', 'DESC'], ['url', 'ASC']]
	});
	console.log(item1);
	let item2 = await CRUD.create(User, {
		name: "阿迪",
		age: 43
	});
	console.log(item2);
	let list2 = await CRUD.update(User, {
		where: {
			age: 43
		}
	}, {
		name: "oi单位i"
	});
	console.log(list2);
	let list3 = await CRUD.delete(User, {
		where: {
			age: 99
		}
	});
	console.log(list3);
})();
 * 
 * 
 */

let CRUD = {};

CRUD.findAll = async (Table, opts) => {
	try {
		let list = await Table.findAll(Object.assign({}, opts || {}));
		console.log(`find ${list.length} in ${Table.name}`);
		return list;
	} catch (e) {
		console.log(`findAll_error: ${e.message}`);
		return null;
	}
}

CRUD.findItem = async (Table, opts) => {
	try {
		let list = await CRUD.findAll(Table, opts);
		return list[0];
	} catch (e) {
		console.log(`findItem_error: ${e.message}`);
		return null;
	}
}

CRUD.create = async (Table, newVal, opts) => {
	try {
		return await Table.create(newVal || {}, Object.assign({}, opts || {}));
	} catch (e) {
		console.log(`create_error: ${e.message}`);
		return null;
	}
}

CRUD.update = async (Table, opts, newVal) => {
	try {
		let list = await CRUD.findAll(Table, opts);
		for (let item of list) {
			for (let k in newVal) {
				item[k] = newVal[k];
			}
			item.save();
		}
		return list;
	} catch (e) {
		console.log(`update_error: ${e.message}`);
		return null;
	}
}

CRUD.delete = async (Table, opts) => {
	try {
		let list = await CRUD.findAll(Table, opts);
		for (let item of list) {
			item.destroy();
		}
		return list;
	} catch (e) {
		console.log(`delete_error: ${e.message}`);
		return null;
	}
}

module.exports = CRUD;