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


io.on("connection", function(socket) {
  console.log("user connected");
})

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
});