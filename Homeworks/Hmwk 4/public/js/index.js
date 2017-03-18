function moveToChatRoom() {
    $.post("/chatRoom", function(data, status){
        if (status == 400) {
            alert("there was an error: " + data);
        } else {
            //successful
            segueToChatRoom(data.name);
        }
    });
}

function segueToChatRoom(name) {
    window.location.href = '../chat.html?room=' + name;
}