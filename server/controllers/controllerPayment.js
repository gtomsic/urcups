const asyncHandler = require('express-async-handler');
const db = require('../models');
const { v4: uuid } = require('uuid');

module.exports.controllerGetPaypalId = asyncHandler(async (req, res) => {
   res.send(process.env.PAYPAL_ID);
});
