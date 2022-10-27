module.exports = (sequelize, DataTypes) => {
   const comment = sequelize.define('comment', {
      story_id: {
         type: DataTypes.INTEGER,
         allowNull: true,
      },
      body: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      user_id: {
         type: DataTypes.UUID,
         allowNull: false,
      },
   })
   return comment
}
