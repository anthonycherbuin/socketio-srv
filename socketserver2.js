// import express from "express";
// import { Server } from "socket.io";

// const PORT = process.env.PORT || 3000;
// const INDEX = '/index.html';

// const server = express()
//   .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
//   .listen(PORT, () => console.log(`Listening on ${PORT}`));

//   const io = new Server(server, {
//     cors: {
//       origin: '*',
//     },
//     methods: ["GET", "POST"]
//   });


// // Register "connection" events to the WebSocket
// io.on("connection", function(socket) {
//     console.log("user connected on socket:", socket.id);
//     // Register "join" events, requested by a connected client
//     socket.on("join", function (data) {
//       // join channel provided by client
//       console.log("client connected in room: ", data.room)
//       socket.join(data.room);
//       // socket.to(data.room).emit('nana', socket.id);
  
  
//       if(data.isGun){
//         io.to(data.room.toString()).emit('phoneConnected');
//       }
  
//       // Register "image" events, sent by the client
//       socket.on("mobileCoordinates", function(data) {
//         io.to(data.room.toString()).emit('mobileCoordinates',data);
//       });
  
//       // socket.on("mobileAcceleration", function(data) {
//       //   io.to(data.room.toString()).emit('mobileAcceleration',data.acceleration);
//       // });
  
      
  
//       socket.on("fire", function(data) {
//         io.to(data.room.toString()).emit('fire');
//       });
  
//       socket.on('disconnect', () => console.log('Client disconnected'));
//       // socket.on("disconnect", function(data) {
//       //   console.log("disconnecteddd", data, socket.id);
//       // });
  
//     })
//   });