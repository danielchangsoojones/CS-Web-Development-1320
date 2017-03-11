function moveToChatRoom() {
    var roomIdentifier = generateRoomIdentifier();
    window.location.href = '../chat.html?room=' + roomIdentifier;
}

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