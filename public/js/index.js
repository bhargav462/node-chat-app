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

socket.on('newLocationMessage',function(message){
    var li = $('<li></li>');
    var a = $('<a target="_blank">My Current Location</a>');
    li.text(`${message.from}:`);
    a.attr('href',message.url);
    li.append(a);
    $('#messages').append(li);
})

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();

    socket.emit('createMessage',{
        from:'user',
        text:$('[name=message]').val()
    },function(){
         
    });
});

var locationButton = $('#send-location');
locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
    },function(){
        alert('Unable to fetch the location');
    });
});

