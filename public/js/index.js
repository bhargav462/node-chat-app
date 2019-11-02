var socket = io();

socket.on('connect',function(){
  console.log('Connected to Server');


  socket.emit('createMessage',{
    from:"client@gmail.com",
    text:"Hi! from client"
});
});

socket.on('newMessage',function(newMessage){
    console.log('newMessage',newMessage);
});

socket.on('disconnect',function(){
    console.log('Disconnected');
});

