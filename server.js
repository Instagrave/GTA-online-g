const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const crypto = require("crypto");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

const rooms = new Map();
const MAX_PLAYERS = 8;

function makeCode() {
  let code;
  do {
    code = crypto.randomBytes(3).toString("hex").toUpperCase();
  } while (rooms.has(code));
  return code;
}

function roomSnapshot(room) {
  return {
    code: room.code,
    players: [...room.players.values()].map(p => ({ id: p.id, name: p.name })),
    messages: room.messages.slice(-50)
  };
}

function leaveRoom(socket) {
  const code = socket.data.roomCode;
  if (!code) return;
  const room = rooms.get(code);
  if (room) {
    const player = room.players.get(socket.id);
    room.players.delete(socket.id);
    if (player) {
      io.to(code).emit("system-message", `${player.name} saiu da sala.`);
    }
    if (room.players.size === 0) {
      rooms.delete(code);
    } else {
      io.to(code).emit("room-update", roomSnapshot(room));
    }
  }
  socket.leave(code);
  socket.data.roomCode = null;
}

io.on("connection", socket => {
  socket.on("create-room", ({ name }, callback = () => {}) => {
    leaveRoom(socket);
    const cleanName = String(name || "").trim().slice(0, 18);
    if (!cleanName) return callback({ ok: false, error: "Digite um nome para entrar." });

    const code = makeCode();
    const room = { code, players: new Map(), messages: [] };
    room.players.set(socket.id, { id: socket.id, name: cleanName });
    rooms.set(code, room);
    socket.join(code);
    socket.data.roomCode = code;
    callback({ ok: true, room: roomSnapshot(room) });
    io.to(code).emit("room-update", roomSnapshot(room));
    io.to(code).emit("system-message", `${cleanName} criou a sala.`);
  });

  socket.on("join-room", ({ name, code }, callback = () => {}) => {
    leaveRoom(socket);
    const cleanName = String(name || "").trim().slice(0, 18);
    const cleanCode = String(code || "").trim().toUpperCase();
    const room = rooms.get(cleanCode);
    if (!cleanName) return callback({ ok: false, error: "Digite um nome para entrar." });
    if (!room) return callback({ ok: false, error: "Sala não encontrada. Confira o código." });
    if (room.players.size >= MAX_PLAYERS) return callback({ ok: false, error: "Esta sala está cheia." });

    room.players.set(socket.id, { id: socket.id, name: cleanName });
    socket.join(cleanCode);
    socket.data.roomCode = cleanCode;
    callback({ ok: true, room: roomSnapshot(room) });
    io.to(cleanCode).emit("room-update", roomSnapshot(room));
    io.to(cleanCode).emit("system-message", `${cleanName} entrou na sala.`);
  });

  socket.on("send-message", ({ text }, callback = () => {}) => {
    const code = socket.data.roomCode;
    const room = rooms.get(code);
    const player = room && room.players.get(socket.id);
    const message = String(text || "").trim().slice(0, 300);
    if (!room || !player) return callback({ ok: false, error: "Entre em uma sala primeiro." });
    if (!message) return callback({ ok: false, error: "Digite uma mensagem." });

    const item = {
      name: player.name,
      text: message,
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    };
    room.messages.push(item);
    if (room.messages.length > 100) room.messages.shift();
    io.to(code).emit("chat-message", item);
    callback({ ok: true });
  });

  socket.on("leave-room", () => leaveRoom(socket));
  socket.on("disconnect", () => leaveRoom(socket));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`GTA Online Salas iniciado na porta ${PORT}`);
});
