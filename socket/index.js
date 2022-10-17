const express = require('express')
const http = require('http')
const cors = require('cors')
const socketio = require('socket.io')

const app = express()
app.use(cors())
app.use(express.json())

const users = []

const server = app.listen(9000)

const io = socketio(server, {
   cors: {
      origin: 'http://10.0.0.50:3000',
      methods: ['GET', 'POST', 'UPDATE', 'DELETE', 'PUT'],
   },
})

const addUser = (data, socketId) => {
   if (!users.some((user) => user.user_id === data?.id)) {
      users.push({
         user_id: data?.id,
         socketId,
         username: data?.username,
         thumbnail: data?.thumbnail,
         age: data?.age,
         sex: data?.sex,
         city: data?.city,
         stateProvince: data?.stateProvince,
         country: data?.country,
         isOnline: data?.isOnline,
         createdAt: data?.createdAt,
         updatedAt: data?.updatedAt,
      })
   }
}

const removeUser = (socketId) => {
   users = users.filter((user) => user.socketId !== socketId)
}

const getUser = (user_id) => {
   return users.find((user) => user.user_id === user_id)
}

io.on('connection', (socket) => {
   // User just joined
   socket.on('user_joined', (data) => {
      addUser(data, socket.id)
      socket.emit('user_joined', data)
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
      console.log(data)
      io.emit(`${data.receiverId}/isTyping`, data)
   })
   // When disconnect
   socket.on('disconnected', () => {
      console.log('User is disconnected')
      removeUser(socket.id)
   })
})
