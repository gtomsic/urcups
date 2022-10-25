class Namespaces {
   constructor(
      user_id,
      socketId,
      username,
      age,
      avatar,
      wallpaper,
      sexualOrientation,
      city,
      stateProvince,
      country,
      hugot,
      isOnline,
      createdAt,
      updatedAt
   ) {
      this.user_id = user_id
      this.socketId = socketId
      this.username = username
      this.avatar = avatar
      this.wallpaper = wallpaper
      this.age = age
      this.sexualOrientation = sexualOrientation
      this.city = city
      this.stateProvince = stateProvince
      this.country = country
      this.hugot = hugot
      this.isOnline = isOnline
      this.createdAt = createdAt
      this.updatedAt = updatedAt
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
