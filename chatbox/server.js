var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require("path");
var io = require('socket.io')(http);

var onlineUsers = [];

app.use(express.static(path.join(__dirname, "public")));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/view/chatPage.html');
});

io.on('connection', function(socket) {

    //   console.log('a user connected');

    socket.on('user name', function(user, callback) {
        var temp = 0;
        onlineUsers.push({
            profileName: user.userName,
            profileId: socket.id,
            profileImage: user.imageUrl,
            profileAge: user.userAge,
            profileSchool: user.userSchool,
            profileCity: user.userCity,
            counter: temp
        })

        // console.log(userName);
        console.log(onlineUsers);

        io.sockets.emit('connectedUsers', onlineUsers);

    });

    socket.on('disconnect', function() {
        var i = 0;
        while (i < onlineUsers.length) {
            if (onlineUsers[i].profileId == socket.id) {
                break;
            }
            i++;
        }
        console.log(socket.id + 'disconnect');

        onlineUsers.splice(i, 1);
        io.sockets.emit('connectedUsers', onlineUsers);
        //console.log('user disconnected');
    });

    socket.on('chatting', function(message, sender, receiver) {

        socket.to(receiver).emit('reciverPeer', message, socket.id, receiver);
        socket.emit('senderPeer', message, socket.id, receiver);

    })

});

http.listen(3000, function() {
    console.log('listening on *:3000');
});