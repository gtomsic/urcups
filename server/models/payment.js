module.exports = (sequelize, DataTypes) => {
   const payment = sequelize.define('payment', {
      firstName: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      lastName: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      email: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      amount: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      orderId: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      user_id: {
         type: DataTypes.UUID,
         allowNull: false,
      },
   });
   return payment;
};
