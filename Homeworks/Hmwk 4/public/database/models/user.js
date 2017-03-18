module.exports = function(sequelize, DataTypes) {
	return sequelize.define("user", {
	    room: {
	        type: DataTypes.STRING
	    }
	    , username: {
	        type: DataTypes.STRING
	    }
	});
};