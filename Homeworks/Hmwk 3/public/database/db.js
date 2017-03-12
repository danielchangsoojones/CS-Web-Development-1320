var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/data.sqlite'
});
var db = {};

db.chatRoom = sequelize.import(__dirname + '/models/chatRoom.js');
db.message = sequelize.import(__dirname + '/models/message.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

