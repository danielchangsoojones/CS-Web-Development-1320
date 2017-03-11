var express = require('express')
var app = express();
var http = require('http').Server(app);

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

var PORT = 8080;
http.listen(PORT, function() {
    console.log("server started");
});