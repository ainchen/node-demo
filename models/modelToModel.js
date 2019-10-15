'use strict';

/**
 * 表关联//to 生成外键
 * 
 * relation: 1
 * one to one
 * 
 * relation: 2
 * one to many
 * 
 * relation: 3
 * many to many
 */

module.exports = [
	{
		from: "Account",
		to: "User",
		fromAs: "account",
		toAs: "user",
		relation: 1
	}, {
		from: "Family",
		to: "User",
		fromAs: "family",
		toAs: "users",
		relation: 2
	}, {
		from: "Family",
		to: "Pet",
		fromAs: "family",
		toAs: "pets",
		relation: 2
	}, {
		from: "User",
		to: "Menu",
		fromAs: "users",
		toAs: "menus",
		table: "user_menu",
		relation: 3
	}
];