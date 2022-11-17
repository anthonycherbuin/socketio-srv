const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const PORT = process.env.PORT || 3000;
  const io = new Server(server, {
    cors: {
      origin: '*',
    }
  });


app.get('/', (req,res)=>{
  res.write(`port: ${PORT}`);
  res.end();
})


// Register "connection" events to the WebSocket
io.on("connection", function(socket) {
  console.log("user connected on socket:", socket.id);
  // Register "join" events, requested by a connected client
  socket.on("join", function (data) {
    // join channel provided by client
    console.log("client connected in room: ", data.room)
    socket.join(data.room);
    // socket.to(data.room).emit('nana', socket.id);


    if(data.isGun){
      io.to(data.room.toString()).emit('phoneConnected');
    }

    // Register "image" events, sent by the client
    socket.on("mobileCoordinates", function(data) {
      io.to(data.room.toString()).emit('mobileCoordinates',data);
    });

    // socket.on("mobileAcceleration", function(data) {
    //   io.to(data.room.toString()).emit('mobileAcceleration',data.acceleration);
    // });

    

    socket.on("fire", function(data) {
      io.to(data.room.toString()).emit('fire');
    });
  })
});


server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
});

