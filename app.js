//jshint esversion:6

const express = require("express");
const socket = require("socket.io");
// const bodyParser = require("body-parser");

const app = express();

// app.set('view engine', 'ejs');

// app.use(bodyParser.urlencoded({extended: true}));
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT,function(){
  console.log("Listening to requests at port 3000");
});

//Static files
app.use(express.static("public"));

//Socket Setup
var io = socket(server);

io.on('connection',function(socket){
  console.log("Made socket connection",socket.id);

  socket.on('chat',function(data){
    io.sockets.emit('chat',data);
  });

  socket.on('typing',function(data){
    socket.broadcast.emit('typing',data);
  });

  socket.on('disconnect', function(){
    console.log('Client disconnected');
  });
});
