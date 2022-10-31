const asyncHandler = require('express-async-handler')
const db = require('../models')

module.exports.controllerCountComments = asyncHandler(async (req, res) => {
   const count = await db.comment.count({
      where: { story_id: req.params.story_id },
   })
   res.status(200).send({ count, story_id: req.params.story_id })
})
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
module.exports.controllerDeleteComments = asyncHandler(async (req, res) => {
   await db.comment.destroy({
      where: {
         id: req.params.id,
         user_id: req.user.id,
      },
   })
   res.status(200).send({ id: req.params.id, user_id: req.user.id })
})
module.exports.controllerUpdateComments = asyncHandler(async (req, res) => {
   await db.comment.update(
      { ...req.body },
      {
         where: {
            id: req.body.id,
            user_id: req.user.id,
         },
      }
   )
   const comment = await db.comment.findOne({ where: { id: req.body.id } })
   res.status(201).json(comment)
})
module.exports.controllerUpdateComments = asyncHandler(async (req, res) => {
   await db.comment.update(
      { ...req.body },
      {
         where: {
            id: req.body.id,
            user_id: req.user.id,
         },
      }
   )
   const comment = await db.comment.findOne({ where: { id: req.body.id } })
   res.status(201).json(comment)
})
module.exports.controllerCreateComments = asyncHandler(async (req, res) => {
   const comment = await db.comment.create({
      ...req.body,
      user_id: req.user.id,
   })
   res.status(201).json(comment)
})
