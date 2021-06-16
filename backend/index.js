const app = require("express")();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

let users = [];

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("join server", (username) => {
    console.log(username);
    const user = {
      username,
      id: socket.id,
    };
    users.push(user);
    io.emit("new user", users);
  });

  socket.on("join room", (roomName, cb) => {
    socket.join(roomName);
    io.to(roomName).emit("new-joinee", socket.id);
    cb(roomName);
  });

  socket.on("new-joinee-song", (msg) => {
    console.log(msg);
    io.to(msg.id).emit("new-joinee-song", msg);
  });

  socket.on("song-select", (msg) => {
    //console.log(msg);
    io.to(msg.cId).emit("song-select", msg.song);
  });

  socket.on("play", (msg) => {
    io.to(msg.cId).emit("play", msg.time);
  });

  socket.on("pause", (msg) => {
    io.to(msg.cId).emit("pause", msg.time);
  });
  socket.on("reset", (msg) => {
    io.to(msg.cId).emit("reset");
  });
});

httpServer.listen(3001);
