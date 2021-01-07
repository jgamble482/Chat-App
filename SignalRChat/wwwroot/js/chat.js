`use strict`

var connection = new signalR.HubConnectionBuilder().withUrl("/chathub").build();

//Send button should be disaled until connection is established
document.getElementById("sendButton").disabled = true;

//Setting up connection and message list additions
connection.on("ReceiveMessage", function(user, message)
{
    var msg = message.replace(/&/g, "&amp").replace(/</g, "&lt;");
    var encodedMsg = user + " says " + msg;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

//Starting connection and enabling send button
connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

//Adding click event handler to send button
document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

