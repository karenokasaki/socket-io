const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: { origin: "*" },
});
const cors = require("cors");

//app.use(cors({ origin: "*" }));

const users = [];

io.on("connection", (socket) => {
  console.log("a user connected");
  io.emit("message", "Novo usário conectado");

  console.log(socket.rooms);
  console.log(socket.id);
  console.log(socket.data);

  socket.on("message", (message, name) => {
    socket.data.name = "karen";

    io.emit("message", `${name} said ${message}`);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    io.emit("message", "Usuário saiu!");
  });
});

server.listen(8080, () => {
  console.log("listening on *:8080");
});
