var db = require(path_DB);

let Account = db.defineModel('account', {
	username: db.STRING(255),
	password: db.STRING(255)
});

module.exports = Account;