module.exports = (sequelize, DataTypes) => {
   const address = sequelize.define('address', {
      street: {
         type: DataTypes.STRING,
         allowNull: false,
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
      zipCode: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      user_id: {
         type: DataTypes.UUID,
         allowNull: false,
      },
   })
   return address
}
