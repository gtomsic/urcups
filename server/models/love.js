module.exports = (sequelize, DataTypes) => {
   const love = sequelize.define('love', {
      story_id: {
         type: DataTypes.INTEGER,
         allowNull: true,
      },
      user_id: {
         type: DataTypes.UUID,
         allowNull: false,
      },
   })
   return love
}
