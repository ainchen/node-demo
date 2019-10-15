var db = require(path_DB);

let Family = db.defineModel('family', {
	name: db.STRING(255),
	address: db.STRING(255)
});

module.exports = Family;