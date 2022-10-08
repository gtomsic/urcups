module.exports = (sequelize, DataTypes) => {
   const photo = sequelize.define('photo', {
      isPrivate: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
         defaultValue: false,
      },
      album: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      fileName: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      user_id: {
         type: DataTypes.UUID,
         allowNull: false,
      },
   })
   return photo
}
