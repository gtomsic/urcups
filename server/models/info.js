module.exports = (sequelize, DataTypes) => {
   const info = sequelize.define('info', {
      hugot: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      maritalStatus: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      sexualOrientation: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      children: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      lookingFor: {
         type: DataTypes.STRING,
         allowNull: true,
      },

      height: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      race: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      bodyType: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      education: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      occupation: {
         type: DataTypes.STRING,
         allowNull: true,
      },

      smoking: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      dringking: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      language: {
         type: DataTypes.STRING,
         allowNull: true,
      },

      astrology: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      hairColor: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      eyeColor: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      religion: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      hobbies: {
         type: DataTypes.TEXT,
         allowNull: true,
      },
      idealPartner: {
         type: DataTypes.TEXT,
         allowNull: true,
      },
      about: {
         type: DataTypes.TEXT,
         allowNull: true,
      },
      user_id: {
         type: DataTypes.UUID,
         allowNull: false,
      },
   })
   return info
}
