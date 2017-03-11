var express = require('express')
var app = express();
var http = require('http').Server(app);

//using socket io to refresh the messages. This is better than repeating queries every 5 seconds because it does not produce unneeded queries, and it also updates immediately. 
var io = require("socket.io")(http);

app.use(express.static(__dirname + "/public"));

io.on("connection", function(socket) {
    console.log("user connected via socket.io");
    
    //the server receives the message from a particular person, and then it fires that message off to everyone, including the sender, so all chat rooms will update with the newest message
    socket.on("message", function(message) {
        io.emit("message", message);
    });
});

var PORT = 8080;
http.listen(PORT, function() {
    console.log("server started");
});