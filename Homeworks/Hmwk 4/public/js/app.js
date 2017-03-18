var room = getQueryVariable("room");
var username = window.prompt("enter a username/nickname");
var socket = io();

$(document).ready(function() { 
    showChatRoomName();
    createNickname();
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
    getNicknames();
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

//changing and removing usernames
socket.on("removeUser", function(req) {
    getNicknames();
});

function setUsers(users) {
    var $username = jQuery(".users");
    //reset html elements
    $( ".usernames" ).remove();
    for (i = 0; i < users.length; i++) {
        var user = users[i];
        $username.append('<h3 class="usernames">' + user.username + '</h3>');
    }
}

//updating/saving/retrieving a nickname
function createNickname() {
    $.post("/user?username=" + username + "&room=" + room, function(data, status){
        if (status == 400) {
            alert("there was an error: " + data);
        } else {
            getNicknames();
        }
    });
}

socket.on("nicknameChanged", function(message) { 
    getNicknames();
});

function getNicknames() {
    $.get("/user?room=" + room + "&username=" + username, function(data, status){
        if (status == 400) {
            alert("there was an error: " + data);
        } else {
            //successful
            setUsers(data);
        }
    });
}

function changeNickname() {
    var newUsername = window.prompt("enter a new username/nickname");
    $.ajax({
        url: "/user?room=" + room + "&newUsername=" + newUsername + "&oldUsername=" + username,
        type: 'PUT',
        success: function(result) {
            socket.emit("nicknameChanged", {
                oldUsername: username,
                newUsername: newUsername,
            });
        }
    });
    username = newUsername;
}