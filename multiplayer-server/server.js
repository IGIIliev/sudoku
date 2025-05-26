const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const messagesHistory = {};
const gridHistory = {};
const rooms = new Set();

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  // Send list of rooms when requested
  socket.on('getRooms', () => {
    socket.emit('roomsList', Array.from(rooms));
  });

  // Create a new room
  socket.on('createRoom', room => {
    console.log(room)
    if (!rooms.has(room)) {
      rooms.add(room);
      messagesHistory[room] = [];
      gridHistory[room] = [];
      io.emit('roomsList', Array.from(rooms)); // notify all clients
    }
  });

  // Remove existing room
  socket.on('removeRoom', (room) => {
    if (rooms.has(room)) {
      rooms.delete(room);
      delete messagesHistory[room];
      delete gridHistory[room];
      io.emit('roomsList', Array.from(rooms));
      console.log(`Room removed: ${room}`);
    }
  });

  // Join to a room
  socket.on('joinRoom', room => {
    socket.join(room);
    console.log(`User joined room: ${room}`);

    socket.emit('messagesHistory', messagesHistory[room] || []);
    socket.emit('gridHistory', gridHistory[room] || []);
  });

  socket.on('message', ({ room, user, text }) => {
    const message = { user, text, time: new Date().toISOString() };

    // Save message to room history
    if (!messagesHistory[room]) messagesHistory[room] = [];
    messagesHistory[room].push(message);

    // Send to others in room
    io.to(room).emit('message', message);
  });

  socket.on('grid', ({ gridData, room }) => {
    const grid = gridData;

    // Save grid to room history
    // if (!gridHistory[room]) gridHistory[room] = [];
    // gridHistory[room].push(gridData);


    gridHistory[room] = [];
    gridHistory[room] = gridData;


    // Send to others in room
    io.to(room).emit('grid', grid);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Socket.IO server running at http://localhost:3000/');
});
