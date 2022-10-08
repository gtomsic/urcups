module.exports = (sequelize, DataTypes) => {
   const access = sequelize.define('access', {
      granted: {
         type: DataTypes.STRING,
         allowNull: false,
         defaultValue: 'free',
      },
      membership: {
         type: DataTypes.STRING,
         allowNull: false,
         defaultValue: '3',
      },
      user_id: {
         type: DataTypes.UUID,
         allowNull: false,
      },
   });
   return access;
};
