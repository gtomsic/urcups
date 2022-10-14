module.exports = (sequelize, DataTypes) => {
   const notifcation = sequelize.define('notifcation', {
      id: {
         type: DataTypes.UUID,
         allowNull: false,
         primaryKey: true,
      },
      title: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      body: {
         type: DataTypes.STRING,
         allowNull: false,
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
   return notifcation
}
