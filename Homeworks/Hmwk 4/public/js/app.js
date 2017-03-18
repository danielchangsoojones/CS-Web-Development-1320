var room = getQueryVariable("room");
var username = window.prompt("enter a username/nickname");
var socket = io();

$(document).ready(function() { 
    showChatRoomName(); 
    loadPreviousMessages();
});

//establishing socket connection
socket.on("connect", function() {
    console.log("successfully connected to socket io");
    socket.emit("joinRoom", {
        name: username,
        room: room
    });
});

socket.on("join", function(join) {
    addMessage(join);
    addUsers(join.users);
});

//recieving a new message
socket.on("message", function(message) {    
    addMessage(message);
});

function addMessage(message) {
    var $message = jQuery(".messages");
    $message.append("<p><strong>" + message.name + '</strong></p>');
    $message.append('<p>' + message.text + '</p>');
}

//handles submitting of new message
var $form = jQuery("#message-form");

$form.on("submit", function(event) {
    event.preventDefault();
    socket.emit("message", {
        name: username,
        room: room,
        text: $form.find('input[name="message"]').val()
    });
    saveMessage();
});

function saveMessage() {
    $.post("/message?username=" + username + "&room=" + room + "&text=" + $form.find('input[name="message"]').val(), function(data, status){
        if (status == 400) {
            alert("there was an error: " + data);
        }
    });
}

//show the chatroom name at the start of the messages
function showChatRoomName() {
    var $message = jQuery(".messages");
    $message.append("<h1> Chat Room " + room + '</h1>');
}

function loadPreviousMessages() {
    $.get("/message?name=" + room, function(data, status){
        console.log("cutttie");
        if (status == 400) {
            alert("there was an error: " + data);
        } else {
            //successful
            loadMessagesIntoUI(data);
        }
    });
}

function loadMessagesIntoUI(data) {
    for (i = 0; i < data.length; i++) { 
       var message = data[i];
        var $message = jQuery(".messages");
        $message.append("<p><strong>" + message.username + '</strong></p>');
        $message.append('<p>' + message.body + '</p>');
    }
}

//loading the current users for the chatroom
function addUsers(users) {
    for (i = 0; i < users.length; i++) {
        var user = users[i];
        var $username = jQuery(".users");
        $username.append("<p><strong>" + user + '</strong></p>');
    }
}