module.exports = (sequelize, DataTypes) => {
   const bell = sequelize.define('bell', {
      id: {
         type: DataTypes.UUID,
         allowNull: false,
         primaryKey: true,
      },
      body: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      isRead: {
         type: DataTypes.STRING,
         allowNull: false,
         defaultValue: false,
      },
      link: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      receiver: {
         type: DataTypes.UUID,
         allowNull: false,
      },
      user_id: {
         type: DataTypes.UUID,
         allowNull: false,
      },
   })
   return bell
}
