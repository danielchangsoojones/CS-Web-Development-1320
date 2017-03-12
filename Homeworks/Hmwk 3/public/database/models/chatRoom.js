module.exports = function(sequelize, DataTypes) {
	   return sequelize.define("chatRoom", {
	       name: {
	           type: DataTypes.STRING, //making sure that the chatRoom has a unique name, if not, then it throws an error.
	           unique: true //everytime a new chatRoom is saved, we create a new 6 digit identifier for it.
	       }
	   });
};