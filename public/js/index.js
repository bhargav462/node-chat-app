var socket = io();

socket.on('connect',function(){
  console.log('Connected to Server');
  socket.on('adminMessage',function(message){
      console.log(message);
  });
});

// socket.emit('createMessage',{
//     from:"me",
//     text:"test"
// },function(data){
//     console.log('nothing',data);
// })

socket.on('newMessage',function(message){
    console.log('newMessage',message);
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});

socket.on('disconnect',function(){
    console.log('Disconnected');
});

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();

    socket.emit('createMessage',{
        from:'user',
        text:$('[name=message]').val()
    },function(){
         
    })
});

