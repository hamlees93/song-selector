const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const port = 3002;
const app = express();

// our server instance
const server = http.createServer(app);

// This creates our socket using the instance of the server
const io = socketIO(server);

// This is what the socket.io syntax is like, we will work this later
io.on("connection", socket => {
  console.log("New client connected");

  socket.on("channel-join", data => {
    socket.join(data);
  });

  socket.on("send url", (url, channel) => {
    console.log("Url sent: ", url);
    io.to(channel).emit("new url", url);
    io.sockets.emit("send url", true);
    // io.sockets.emit("new url", url);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
