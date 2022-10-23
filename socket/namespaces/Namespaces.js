class Namespaces {
   constructor(
      id,
      socketId,
      username,
      age,
      sexualOrientation,
      city,
      stateProvince,
      country,
      hugot
   ) {
      this.id = id
      this.socketId = socketId
      this.username = username
      this.age = age
      this.sexualOrientation = sexualOrientation
      this.city = city
      this.stateProvince = stateProvince
      this.country = country
      this.hugot = hugot
      this.rooms = []
   }
   addRoom(room) {
      const findRoom = this.rooms.find(
         (item) => item.roomTitle === room.roomTitle
      )
      if (!findRoom) {
         this.rooms.push(room)
      }
   }
}

module.exports = Namespaces
