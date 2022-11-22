require('dotenv').config();
const express = require('express');
const cors = require('cors');
const socketio = require('socket.io');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
   res.send('Socket is running...');
});

const PORT = process.env.PORT || 9000;

const server = app.listen(PORT);

const io = socketio(server, {
   cors: {
      origin: '*',
      methods: ['GET', 'POST', 'UPDATE', 'DELETE', 'PUT'],
   },
});

io.on('connection', (socket, req) => {
   socket.emit('messageFromServer', {
      data: 'Welcome to the socket.io server!!!',
   });
   socket.on('messageToServer', (msg) => {
      console.log(msg);
   });
   socket.on('user', (user) => {
      io.emit('user', { ...user });
   });

   // Send receive messages
   socket.on('message', (message) => {
      io.emit(`${message.receiver}/message`, {
         ...message,
      });
   });

   // Bells
   socket.on('stories', (data) => {
      io.emit(`/stories${data.path}`, data);
   });

   // When the user is typing message
   socket.on('typing', (type) => {
      io.emit(type.receiver, type);
   });

   // When disconnect
   socket.on('disconnected', () => {
      console.log('User is disconnected');
   });
});
