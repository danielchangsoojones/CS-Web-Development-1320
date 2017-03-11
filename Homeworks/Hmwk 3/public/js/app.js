var username = window.prompt("enter a username/nickname");
var socket = io();

$(document).ready(function() { 
    showChatRoomName();                         
});

//establishing socket connection
socket.on("connect", function() {
    console.log("successfully connected to socket io");
});

//recieving a new message
socket.on("message", function(message) {    
    var $message = jQuery(".messages");
    $message.append("<p><strong>" + message.name + '</strong></p>');
    $message.append('<p>' + message.text + '</p>');
});

//handles submitting of new message
var $form = jQuery("#message-form");

$form.on("submit", function(event) {
    event.preventDefault();
    socket.emit("message", {
        name: username,
        text: $form.find('input[name="message"]').val()
    });
});

//show the chatroom name at the start of the messages
function showChatRoomName() {
    var room = getQueryVariable("room");
    var $message = jQuery(".messages");
    $message.append("<h1> Chat Room " + room + '</h1>');
}