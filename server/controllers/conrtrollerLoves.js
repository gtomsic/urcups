const asyncHandler = require('express-async-handler')
const db = require('../models')
const { v4: uuid } = require('uuid')

module.exports.controllerCountLoves = asyncHandler(async (req, res) => {
   const countLove = await db.love.count({
      where: { story_id: req.params.story_id },
   })
   res.json(countLove)
})

module.exports.controllerCheckLove = asyncHandler(async (req, res) => {
   const id = req.params.story_id
   const love = await db.love.findOne({
      where: { story_id: id, user_id: req.user.id },
   })
   if (love) {
      res.send(true)
   } else {
      res.send(false)
   }
})

module.exports.controllerAddRemoveLoves = asyncHandler(async (req, res) => {
   const id = req.body.story_id
   const love = await db.love.findOne({
      where: { story_id: id, user_id: req.user.id },
   })
   if (love) {
      await db.love.destroy({ where: { story_id: id, user_id: req.user.id } })
      const countLove = await db.love.count({ where: { story_id: id } })
      res.json(countLove)
   } else {
      await db.love.create({ story_id: id, user_id: req.user.id })
      const countLove = await db.love.count({ where: { story_id: id } })
      res.json(countLove)
   }
})
