var db = require(path_DB);

let Pet = db.defineModel('pet', {
	name: db.STRING(255),
	age: db.INTEGER
});

module.exports = Pet;