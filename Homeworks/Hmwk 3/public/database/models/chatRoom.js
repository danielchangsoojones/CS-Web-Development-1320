module.exports = function(sequelize, DataTypes) {
	   return sequelize.define("chatRoom", {
	       name: {
	           type: DataTypes.STRING, //making sure that the chatRoom has a unique name, if not, then it throws an error.
	           unique: true, //everytime a new chatRoom is saved, we create a new 6 digit identifier for it.
	           defaultValue: generateRoomIdentifier()
	       }
	   });
};

//this function was provided by the CS 1320 class website
function generateRoomIdentifier() {
  // make a list of legal characters
  // we're intentionally excluding 0, O, I, and 1 for readability
  var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

  var result = '';
  for (var i = 0; i < 6; i++)
    result += chars.charAt(Math.floor(Math.random() * chars.length));

  return result;
}