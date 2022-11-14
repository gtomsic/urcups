const asyncHandler = require('express-async-handler');
const db = require('../models');

module.exports.controllerGetPaymentAccess = asyncHandler(async (req, res) => {
   const response = await getUpdatedPayment(req.user.id);
   res.send(response);
});

module.exports.controllerSupportPayment = asyncHandler(async (req, res) => {
   const { id } = req.user;
   let paid = null;
   let membership = 'a';
   let granted = 'free';
   if (req.body.amount === '20.00') {
      membership = 'a';
      granted = 'paid';
   }
   if (req.body.amount === '30.00') {
      membership = 'b';
      granted = 'paid';
   }
   if (req.body.amount === '50.00') {
      membership = 'c';
      granted = 'paid';
   }
   const response = await db.payment.findOne({ where: { user_id: id } });
   if (response) {
      await db.payment.update({ ...req.body }, { where: { user_id: id } });
      await db.access.create({ granted, membership, user_id: req.user.id });
      const result = await getUpdatedPayment(id);
      res.send(result);
   } else {
      paid = await db.payment.create({ ...req.body });
      await db.access.create({ granted, membership, user_id: req.user.id });
      const result = await getUpdatedPayment(id);
      res.send(result);
   }
});

module.exports.controllerGetPaypalId = asyncHandler(async (req, res) => {
   res.send(process.env.PAYPAL_ID);
});

const getUpdatedPayment = async (id) => {
   const status = await db.access.findOne({
      where: { user_id: id },
      order: [['createdAt', 'DESC']],
      subQuery: false,
   });
   const diff = Math.abs(new Date() - status.createdAt);
   const days = Math.ceil(diff / (1000 * 3600 * 24));
   if (status.membership === 'a') {
      if (days > 95) return { ...status.dataValues, days: 0 };
      return { ...status.dataValues, days: days };
   }
   if (status.membership === 'b') {
      if (days > 185) return { ...status.dataValues, days: 0 };
      return { ...status.dataValues, days: days };
   }
   if (status.membership === 'c') {
      if (days > 370) return { ...status.dataValues, days: 0 };
      return { ...status.dataValues, days: days };
   }
   if (status.membership === 'f') {
      return { ...status.dataValues, days: 0 };
   }
};
