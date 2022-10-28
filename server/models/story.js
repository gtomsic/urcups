module.exports = (sequelize, DataTypes) => {
   const story = sequelize.define('story', {
      image: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      title: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      body: {
         type: DataTypes.TEXT,
         allowNull: false,
      },
      user_id: {
         type: DataTypes.UUID,
         allowNull: false,
      },
   })
   return story
}
