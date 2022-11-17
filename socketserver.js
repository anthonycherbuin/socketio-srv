import express from "express";
// import fs from "fs";
const app = express();
import { createServer } from "https";
import { Server } from "socket.io";


// var privateKey  = fs.readFileSync('localhost-key.pem', 'utf8');
// var certificate = fs.readFileSync('localhost.pem', 'utf8');

// var credentials = {key: privateKey, cert: certificate};
// var httpsServer = createServer(credentials, app);
var httpsServer = createServer(app);

const io = new Server(httpsServer, {
  cors: {
    origin: '*',
  },
  methods: ["GET", "POST"]
});


httpsServer.listen(process.env.PORT || 4000, () => {
  console.log('init https io server listening on ::4000');
});

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

    // socket.on("disconnect", function(data) {
    //   console.log("disconnecteddd", data, socket.id);
    // });

  })
});