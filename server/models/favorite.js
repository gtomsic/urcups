module.exports = (sequelize, DataTypes) => {
   const favorite = sequelize.define('favorite', {
      profileId: {
         type: DataTypes.UUID,
         allowNull: false,
      },
      user_id: {
         type: DataTypes.UUID,
         allowNull: false,
      },
   })
   return favorite
}
