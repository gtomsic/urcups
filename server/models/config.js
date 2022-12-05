module.exports = (sequelize, DataTypes) => {
   const config = sequelize.define('config', {
      password: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      email: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      isActivated: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
         defaultValue: false,
      },
      // isSuppended: {
      //    type: DataTypes.BOOLEAN,
      //    allowNull: true,
      //    defaultValue: false,
      // },
      user_id: {
         type: DataTypes.UUID,
         allowNull: false,
      },
   });
   return config;
};
