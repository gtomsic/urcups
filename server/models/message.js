module.exports = (sequelize, DataTypes) => {
   const message = sequelize.define('message', {
      attachment: {
         type: DataTypes.TEXT,
         allowNull: true,
      },
      body: {
         type: DataTypes.TEXT,
         allowNull: false,
      },
      roomId: {
         type: DataTypes.UUID,
         allowNull: false,
      },
      isRead: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
         deafultValue: false,
      },
      user_id: {
         type: DataTypes.UUID,
         allowNull: false,
      },
   })
   return message
}
