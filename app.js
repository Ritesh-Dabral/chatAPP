var express = require('express'),
    app     = express(),
    socket  = require('socket.io');

//Initial Settings
app.use(express.static('public'));


//SERVER
var server = app.listen(8085,()=>{
    console.log("SERVER STARTED");
});

//Socket Setup
var io = socket(server);
io.on('connection',(sckt)=>{
    console.log('connected '+ sckt.id);

    sckt.on('chat',(data)=>{
        io.sockets.emit('chat',data);
    });

    sckt.on('typing',(data)=>{
        sckt.broadcast.emit('typing',data);
    })
});