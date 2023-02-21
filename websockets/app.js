const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('User connected!');
  socket.emit('message', 'User connected!');
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
