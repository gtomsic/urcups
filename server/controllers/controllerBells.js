const db = require('../models')
const Op = require('sequelize').Op
const { v4: uuid } = require('uuid')
const asyncHandler = require('express-async-handler')
const { viewedProfile } = require('../public/htmls')
const { sendEmail } = require('../utils/nodemailer')

module.exports.controllerReadBells = asyncHandler(async (req, res) => {
   await db.bell.update(
      { isRead: true },
      { where: { user_id: req.body.user_id, isRead: false } }
   )
   const bells = await db.bell.findAndCountAll({
      where: { receiver: req.user.id, isRead: false },
      order: [['createdAt', 'DESC']],
      offset: Number(req.body.offset) * Number(req.body.limit),
      limit: Number(req.body.limit),
      subQuery: false,
   })
   res.status(200).json(bells)
})
module.exports.controllerBellDelete = asyncHandler(async (req, res) => {
   await db.bell.destroy({ where: { id: req.params.id } })
   const bells = await db.bell.findAndCountAll({
      where: { receiver: req.user.id },
      order: [['createdAt', 'DESC']],
      offset: Number(req.params.offset) * Number(req.params.limit),
      limit: Number(req.params.limit),
      subQuery: false,
   })
   res.status(200).json(bells)
})

module.exports.controllerGetBells = asyncHandler(async (req, res) => {
   const bells = await db.bell.findAndCountAll({
      where: { receiver: req.user.id },
      order: [['createdAt', 'DESC']],
      offset: Number(req.params.offset) * Number(req.params.limit),
      limit: Number(req.params.limit),
      subQuery: false,
   })
   res.status(200).json(bells)
})

module.exports.controllerBellAction = asyncHandler(async (req, res) => {
   const { title, body, link, user_id } = req.body
   const user = await db.config.findOne({
      where: { user_id },
   })
   const bell = await db.bell.create({
      id: uuid(),
      link,
      body,
      receiver: user_id,
      user_id: req.user.id,
   })
   sendEmail(
      user.email,
      `Hi ${req.user.username} ${req.body.title}`,
      viewedProfile({
         title,
         body,
         avatar: process.env.SERVER_HOST + req.user.avatar,
         link: process.env.WEB_HOST + link,
         webHost: process.env.WEB_HOST,
         serverHost: process.env.SERVER_HOST,
         button: `Check Out`,
      })
   )
   res.status(201).json(bell)
})

module.exports.controllerViewedProfiles = asyncHandler(async (req, res) => {
   const TODAY_START = new Date().setHours(0, 0, 0, 0)
   const NOW = new Date()
   const user = await db.config.findOne({
      where: { user_id: req.body.user_id },
   })
   const countViews = await db.bell.count({
      where: {
         user_id: req.user.id,
         receiver: req.body.user_id,
         createdAt: { [Op.gt]: TODAY_START, [Op.lt]: NOW },
      },
   })
   if (Number(countViews) < 1) {
      const bell = await db.bell.create({
         id: uuid(),
         link: `/profile/${req.user.username}`,
         body: `Viewed your profile.`,
         receiver: req.body.user_id,
         user_id: req.user.id,
      })
      sendEmail(
         user.email,
         `Hi ${req.user.username} just visit you.`,
         viewedProfile({
            title: 'Hey there!',
            body: bell.body,
            avatar: process.env.SERVER_HOST + req.user.avatar,
            link: process.env.WEB_HOST + `/profile/${req.user.username}`,
            webHost: process.env.WEB_HOST,
            serverHost: process.env.SERVER_HOST,
            button: `${req.user.username} profile`.toUpperCase(),
         })
      )
      res.status(201).json(bell)
   } else {
      return res.send({ message: 'Viewed exceed per day.' })
   }
})
