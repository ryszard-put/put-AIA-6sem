const { Server } = require('socket.io');
const http = require('http');

const server = http.createServer();

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000'],
    credentials: true,
  },
});

const users = {};

io.on('connection', (socket) => {
  console.log(`socket id: ${socket.id} connected`);
  users[socket.id] = '';

  socket.on('message', (message) => {
    io.emit('message', `${users[socket.id]}: ${message}`);
  });

  socket.on('login', (nick, callback) => {
    users[socket.id] = nick;
    const active = Object.keys(users)
      .map((key) => users[key])
      .filter((user) => user.length);
    socket.broadcast.emit('user-joined', nick, active);

    callback({
      status: 'OK',
      users: active,
    });
  });

  socket.on('disconnect', (reason) => {
    const nick = users[socket.id];

    delete users[socket.id];

    io.emit(
      'user-left',
      nick,
      Object.keys(users)
        .map((key) => users[key])
        .filter((user) => user.length)
    );
  });
});

server.listen(4000, () => {
  console.log('listening on localhost:4000');
});
