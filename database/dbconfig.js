let db = require('diskdb');
db = db.connect('./database/DB', [ 'users' ]);

module.exports = db;
