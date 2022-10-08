module.exports = (sequelize, DataTypes) => {
   const setting = sequelize.define('setting', {
      filter: {
         type: DataTypes.STRING,
         allowNull: false,
         defaultValue: '25',
      },
      city: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      country: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      sexualType: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      user_id: {
         type: DataTypes.UUID,
         allowNull: false,
      },
   })
   return setting
}
