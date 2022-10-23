class Room {
   constructor(roomId, roomTitle, namespace, privateRoom = false) {
      this.roomId = roomId
      this.roomTitle = roomTitle
      this.namespace = namespace
      this.privateRoom = privateRoom
      this.privateMessage = []
   }
   addMessage = (message) => {
      this.privateMessage.push(message)
   }
   clearPrivateMessage = () => {
      this.privateMessage = []
   }
}
