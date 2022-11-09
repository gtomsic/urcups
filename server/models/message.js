module.exports = (sequelize, DataTypes) => {
   const message = sequelize.define('message', {
      attachment: {
         type: DataTypes.STRING,
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
         defaultValue: false,
      },
      receiver: {
         type: DataTypes.UUID,
         allowNull: false,
      },
      user_id: {
         type: DataTypes.UUID,
         allowNull: false,
      },
      isDeleted: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
         defaultValue: false,
      },
   });
   return message;
};
