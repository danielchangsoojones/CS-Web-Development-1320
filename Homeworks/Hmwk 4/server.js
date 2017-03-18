var express = require('express')
var app = express();
var http = require('http').Server(app);
var db = require("./public/database/db.js");

//using socket io to refresh the messages. This is better than repeating queries every 5 seconds because it does not produce unneeded queries, and it also updates immediately. 
var io = require("socket.io")(http);

app.use(express.static(__dirname + "/public"));

//for remembering the data of a room. SO, it holds the unique id that socket gives then we can retrieve name and room from that. This is basically a cache for the messages, and we are also saving the messages permanently into the database. 
var clientInfo = {};

io.on("connection", function(socket) {
    console.log("user connected via socket.io");
    
    socket.on("joinRoom", function (req) {
        clientInfo[socket.id] = req;
        socket.join(req.room);
        console.log("joinnnnnning");
        io.to(req.room).emit("join", {
            name: "Alert",
            text: req.name + " has joined the room!",
            user: req.name
        });
    });
    
    //the server receives the message from a particular person, and then it fires that message off to everyone, including the sender, so all chat rooms will update with the newest message
    socket.on("message", function(message) {
        //finding the particular room to emit to
        io.to(clientInfo[socket.id].room).emit("message", message);
    });
});

db.sequelize.sync().then(function() {
	var PORT = 8080;
    http.listen(PORT, function() {
        console.log("server started");
    });
});

app.post('/chatRoom', function(req, res){
    saveChatRoom().then(function (chatRoom) {
        res.json(chatRoom.toJSON());
    }, function(error) {
        res.status(400).json(error);
        console.log(error);
    });
});

function saveChatRoom() {
    return new Promise(function(resolve, reject) {
        //the chatRoom data schema requires uniquness from the name field, so it will throw an error if the name is not unique.
        //the Sequelize npm module protects against sql injections inherently. the chatroom is created as an object which has validators. If an sql injection were passed, then the object would not be able to be created, hence blocking the sql injection.
        db.chatRoom.create({
            name: generateRoomIdentifier()
        }).then(function(chatRoom) {
        resolve(chatRoom);
    }).catch(function(error) {
        console.log(error);
        var errorType = error.errors[0].type
        if (errorType == "unique violation") {
            //if the chat room name is not unique, then we recursively save a chatRoom, until a new identifier that is unique is accepted. From a probability standpoint this shouldn't have to run more than once or twice because the chances of producing the same 6 length string twice in a row is astronomically low.
            resolve(saveChatRoom());
        }
    });
    });
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

//loading messages
app.get('/message', function(req, res){
    var chatRoom = req.query.name;
    //the Sequelize npm module protects against sql injections inherently. The room is run through validators to make sure that it is not an injection. 
    db.message.findAll({
        where: {
            room: chatRoom
        }
    }).then(function(messages) {
        res.json(messages);
    }, function(error) {
        res.status(400).json(error);
    });
});

//saving message
app.post("/message", function(req, res) {
    console.log(req);
    //the Sequelize npm module protects against sql injections inherently. the message is created as an object which has validators. If an sql injection were passed, then the object would neot be able to be created, hence blocking the sql injection. 
    db.message.create({
        room: req.query.room,
        username: req.query.username,
        body: req.query.text
    }).then(function(message) {
        res.json(message);
    }, function(error) {
        res.status(400).json(error);
    });
})