module.exports = (sequelize, DataTypes) => {
   const view = sequelize.define('view', {
      profileId: {
         type: DataTypes.UUID,
         allowNull: false,
      },
      user_id: {
         type: DataTypes.UUID,
         allowNull: false,
      },
   })
   return view
}
