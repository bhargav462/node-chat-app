const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.set('view engine','hbs');
app.use(express.static(publicPath));


io.on('connection',(socket) => {
    console.log('New user connection');

    socket.emit('newMessage',{
        from:"admin",
        text:"Welcome to the chat app",
        createAt:new Date().getTime()
    });

    socket.broadcast.emit('newMessage',{
        from:"admin",
        text:"New user joined",
        createAt:new Date().getTime()
    })

    socket.on('createMessage',function(createMessage){
        console.log('createMessage',createMessage);
       io.emit('newMessage',{
           from:createMessage.from,
           text:createMessage.text,
           createAt: new Date().getTime()
       });

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