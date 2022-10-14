module.exports = (sequelize, DataTypes) => {
   const room = sequelize.define('room', {
      id: {
         type: DataTypes.UUID,
         allowNull: false,
         primaryKey: true,
      },
      receiver: {
         type: DataTypes.UUID,
         allowNull: false,
      },
      sender: {
         type: DataTypes.UUID,
         allowNull: false,
      },
      user_id: {
         type: DataTypes.UUID,
         allowNull: false,
      },
   })
   return room
}
