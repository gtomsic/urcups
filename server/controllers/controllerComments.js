const asyncHandler = require('express-async-handler')
const db = require('../models')

module.exports.controllerGetComments = asyncHandler(async (req, res) => {
   const { limit, offset, story_id } = req.params
   const comment = await db.comment.findAndCountAll({
      where: { story_id },
      order: [['createdAt', 'DESC']],
      offset: Number(offset) * Number(limit),
      limit: Number(limit),
      subQuery: false,
   })
   res.status(201).json(comment)
})
module.exports.controllerCreateComments = asyncHandler(async (req, res) => {
   const comment = await db.comment.create({
      ...req.body,
      user_id: req.user.id,
   })
   res.status(201).json(comment)
})
