module.exports = (sequelize, DataTypes) => {
   const payment = sequelize.define('payment', {
      name: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      lastFour: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      type: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      security: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      user_id: {
         type: DataTypes.UUID,
         allowNull: false,
      },
   })
   return payment
}
