var db = require(path_DB);

let User = db.defineModel('user', {
	name: db.STRING(255),
	age: db.INTEGER
});

module.exports = User;