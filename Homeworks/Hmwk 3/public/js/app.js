var name = getQueryVariable("name") || "Anonymous";
var room = getQueryVariable("room");
var socket = io();

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
        name: name,
        text: $form.find('input[name="message"]').val()
    });
});