module.exports = function(sequelize, DataTypes) {
	return sequelize.define("message", {
	    room: {
	        type: DataTypes.STRING
	    }
	    , username: {
	        type: DataTypes.STRING
	    }
	    , body: {
	        type: DataTypes.STRING
	    }
	});
};