module.exports.profileJoinNamespace = (io, data) => {
   io.of(`/${data.id}`).on('connection', (roomSocket) => {
      roomSocket.on('onJoined', (user) => {
         const roomToLeave = Object.keys(roomSocket.rooms)[1]
         roomSocket.leave(roomToLeave)
         roomSocket.join(roomToLeave)
         roomSocket.emit(user.pathname, user)
         console.log(roomSocket.rooms)
      })
   })
}
