const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.set('view engine','hbs');
app.use(express.static(publicPath));


io.on('connection',(socket) => {
    console.log('New user connection');

    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));

    socket.broadcast.emit('newMessage',generateMessage('Admin','New User Joined'));

    socket.on('createMessage',function(message){
        console.log('createMessage',message);
       io.emit('newMessage',generateMessage(message.from,message.text));

    //    socket.broadcast.emit('newMessage',{
    //        from:createMessage.from,
    //        text:createMessage.text,
    //        createdAt:new Date().getTime()
    //    });

    });

    socket.on('disconnect',function(){
        console.log('User was Disconnected');
    })
});

// app.post('/',(req,res) => {
//  res.render('index.html');
// });

server.listen(port,() =>{
    console.log(`server is up on port ${port}`);
})