var db = require(path_DB);

let Menu = db.defineModel('menu', {
	name: db.STRING(255),
	url: db.STRING(255)
});

module.exports = Menu;