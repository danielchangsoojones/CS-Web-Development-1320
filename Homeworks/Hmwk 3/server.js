var express = require('express')
var app = express();
var http = require('http').Server(app);
var db = require("./public/database/db.js");

//using socket io to refresh the messages. This is better than repeating queries every 5 seconds because it does not produce unneeded queries, and it also updates immediately. 
var io = require("socket.io")(http);

app.use(express.static(__dirname + "/public"));

//for remembering the data of a room. SO, it holds the unique id that socket gives then we can retrieve name and room from that.
var clientInfo = {};

io.on("connection", function(socket) {
    console.log("user connected via socket.io");
    
    socket.on("joinRoom", function (req) {
        clientInfo[socket.id] = req;
        socket.join(req.room);
        socket.broadcast.to(req.room).emit("message", {
            name: "Alert",
            text: req.name + "has joined the room!"
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
        db.chatRoom.create({}).then(function(chatRoom) {
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