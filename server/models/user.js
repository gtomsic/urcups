module.exports = (sequelize, DataTypes) => {
   const user = sequelize.define('user', {
      id: {
         type: DataTypes.UUID,
         allowNull: false,
         primaryKey: true,
      },
      username: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
      },
      thumbnail: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      avatar: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      wallpaper: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      age: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      dateOfBirth: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      sex: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      sexualOrientation: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      hugot: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      maritalStatus: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      city: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      stateProvince: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      country: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      isOnline: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
         defaultValue: false,
      },
   });
   return user;
};
