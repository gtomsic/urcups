module.exports = (sequelize, DataTypes) => {
   const message = sequelize.define('message', {
      photos: {
         type: DataTypes.TEXT,
         allowNull: true,
      },
      message: {
         type: DataTypes.TEXT,
         allowNull: false,
      },
      receiverId: {
         type: DataTypes.UUID,
         allowNull: false,
      },
      user_id: {
         type: DataTypes.UUID,
         allowNull: false,
      },
   })
   return message
}
