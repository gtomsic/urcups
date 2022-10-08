const asyncHandler = require('express-async-handler')
const db = require('../models')

module.exports.controllerGetUsersByLimit = asyncHandler(async (req, res) => {
   const { offset, limit, sex } = req.params
   const users = await db.user.findAndCountAll({
      order: [['updatedAt', 'DESC']],
      offset: Number(offset) * Number(limit),
      limit: Number(limit),
      subQuery: false,
   })
   res.status(200).json(users)
})
