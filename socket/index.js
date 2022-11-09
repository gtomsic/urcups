require('dotenv').config();
const express = require('express');
const cors = require('cors');
const socketio = require('socket.io');
const Namespaces = require('./namespaces/namespaces');
const { users } = require('./data/users');

const app = express();
app.use(cors());
app.use(express.json());

const server = app.listen(9000);

const io = socketio(server, {
   cors: {
      origin: process.env.HOST,
      methods: ['GET', 'POST', 'UPDATE', 'DELETE', 'PUT'],
   },
});

const addUser = (data, socketId) => {
   let ns;
   if (!users.some((user) => user.user_id === data?.id)) {
      ns = new Namespaces(
         data?.id,
         socketId,
         data?.username,
         data?.avatar,
         data?.wallpaper,
         data?.age,
         data?.sexualOrientation,
         data?.city,
         data?.stateProvince,
         data?.country,
         data?.hugot,
         data?.isOnline,
         data?.createdAt,
         data?.updatedAt
      );
      users.push(ns);
   }
   return ns;
};

const removeUser = (user_id) => {
   users = users.filter((user) => user.user_id !== user_id);
};

const getUser = (user_id) => {
   return users.find((user) => user.user_id === user_id);
};

io.on('connection', (socket) => {
   // User just joined
   socket.on('user', (data) => {
      addUser(data, socket.id);
      socket.broadcast.emit('user', data);
      if (data?.isOnline == false) {
         io.emit('user', data);
      }
   });

   // Send receive messages
   socket.on('message', (message) => {
      const sender = getUser(message.user_id);
      io.emit(`${message.receiver}/message`, {
         ...message,
         ...sender,
         createdAt: message?.createdAt,
         updatedAt: message?.updatedAt,
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
      removeUser(socket.id);
   });
});
