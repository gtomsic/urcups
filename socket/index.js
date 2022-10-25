require('dotenv').config()
const express = require('express')
const http = require('http')
const cors = require('cors')
const socketio = require('socket.io')
const { profileJoinNamespace } = require('./profileSocket')
const Namespaces = require('./namespaces/namespaces')
const { users } = require('./data/users')

const app = express()
app.use(cors())
app.use(express.json())

const server = app.listen(9000)

const io = socketio(server, {
   cors: {
      origin: 'http://10.0.0.50:3000',
      methods: ['GET', 'POST', 'UPDATE', 'DELETE', 'PUT'],
   },
})

const addUser = (data, socketId) => {
   let ns
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
      )
      users.push(ns)
   }
   return ns
}

const removeUser = (user_id) => {
   users = users.filter((user) => user.user_id !== user_id)
}

const getUser = (user_id) => {
   return users.find((user) => user.user_id === user_id)
}

io.on('connection', (socket) => {
   // User just joined
   socket.on('user', async (data) => {
      await addUser(data, socket.id)
      console.log(users)
      socket.emit('user', data)
   })
   // Send receive messages
   socket.on('sendMessage', (message) => {
      const sender = getUser(message.user_id)
      io.emit(message.receiver, {
         ...message,
         thumbnail: sender?.thumbnail ? sender?.thumbnail : '/avatar.jpg',
         age: sender?.age,
         sex: sender?.sex,
         city: sender?.city,
         stateProvince: sender?.stateProvince,
         country: sender?.country,
         isOnline: sender?.isOnline,
      })
   })
   // When the user is typing message
   socket.on('isTyping', (data) => {
      io.emit(`${data.receiverId}/isTyping`, data)
   })
   // When disconnect
   socket.on('disconnected', () => {
      console.log('User is disconnected')
      removeUser(socket.id)
   })
})
