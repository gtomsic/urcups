module.exports = (sequelize, DataTypes) => {
   const setting = sequelize.define('setting', {
      limit: {
         type: DataTypes.INTEGER,
         allowNull: false,
         defaultValue: 25,
      },
      ageFrom: {
         type: DataTypes.INTEGER,
         allowNull: false,
         defaultValue: 20,
      },
      ageTo: {
         type: DataTypes.INTEGER,
         allowNull: false,
         defaultValue: 25,
      },
      isOnline: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
         defaultValue: false,
      },
      maritalStatus: {
         type: DataTypes.STRING,
         allowNull: false,
         defaultValue: 'All',
      },
      sexualOrientation: {
         type: DataTypes.STRING,
         allowNull: false,
         defaultValue: 'All',
      },
      user_id: {
         type: DataTypes.UUID,
         allowNull: false,
      },
   });
   return setting;
};
