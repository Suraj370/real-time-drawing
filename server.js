const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve the static files from "public" folder
app.use(express.static("public"));

//Handle socket connection
io.on("connection", (socket) => {
  console.log("New client connection");

  //Handle  the message event
  socket.on("drawing", (data) => {
    // Broadcast message to connected client
    socket.broadcast.emit("drawing", data);
  });
  // Handle the disconnet event
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(3000 , () => {
    console.log('Server running at http://localhost:3000');
    
})
