const db = require('../models')
const Op = require('sequelize').Op
const { v4: uuid } = require('uuid')
const asyncHandler = require('express-async-handler')
const { viewedProfile } = require('../public/htmls')
const { sendEmail } = require('../utils/nodemailer')

module.exports.controllerViewedProfiles = asyncHandler(async (req, res) => {
   const TODAY_START = new Date().setHours(0, 0, 0, 0)
   const NOW = new Date()
   const user = await db.config.findOne({
      where: { user_id: req.body.user_id },
   })
   const countViews = await db.bell.count({
      where: {
         title: 'Profile',
         user_id: req.user.id,
         receiver: req.body.user_id,
         createdAt: { [Op.gt]: TODAY_START, [Op.lt]: NOW },
      },
   })
   if (Number(countViews) < 2) {
      const bell = await db.bell.create({
         id: uuid(),
         title: 'Profile',
         body: `${req.user.username} viewed your profile.`,
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
            button: `View ${req.user.username} profile`.toUpperCase(),
         })
      )
      res.status(201).json(bell)
   } else {
      return res.send({ message: 'Viewed exceed per day.' })
   }
})

// CREATE BELLS ACTIONS
// @ POST PRIVATE
// /api/bells/:title
module.exports.controllerBells = asyncHandler(async (req, res) => {
   let bell = null
   const TODAY_START = new Date().setHours(0, 0, 0, 0)
   const NOW = new Date()
   const user = await db.config.findOne({
      where: { user_id: req.body.user_id },
   })
   switch (req.params.title) {
      case req.params.title === 'viewedProfiles':
         const countViews = await db.bell.count({
            where: {
               title: 'Profile Bell',
               user_id: req.user.id,
               receiver: req.body.user_id,
               createdAt: { [Op.gt]: TODAY_START, [Op.lt]: NOW },
            },
         })
         if (Number(countViews) < 2) {
            bell = await db.bell.create({
               id: uuid(),
               title: 'Profile Bell',
               body: `User ${req.user.username} viewed your profile.`,
               receiver: req.body.user_id,
               user_id: req.user.id,
            })
            console.log(req.user)
            sendEmail(
               user.email,
               `Hi ${req.user.username} ${bell.title}`,
               viewedProfile({
                  title: bell.title,
                  body: bell.body,
                  avatar: process.env.SERVER_HOST + req.user.avatar,
                  link: process.env.WEB_HOST + `/profile/${req.user.username}`,
                  webHost: process.env.WEB_HOST,
                  serverHost: process.env.SERVER_HOST,
                  button: 'Check Out',
               })
            )
         } else {
            return res.send({ message: 'Viewed exceed per day.' })
         }
      case req.params.title === 'sendMessages':
         bell = await db.bell.create({
            id: uuid(),
            title: 'Message Bell',
            body: `User ${req.user.username} sent you a message.`,
            receiver: req.body.user_id,
            user_id: req.user.id,
         })
         sendEmail(
            user.email,
            `Hi ${req.body.username} ${bell.title}`,
            viewedProfile({
               title: bell.title,
               body: bell.body,
               avatar: process.env.SERVER_HOST + req.user.avatar,
               link: process.env.WEB_HOST + `/messages`,
               webHost: process.env.WEB_HOST,
               serverHost: process.env.SERVER_HOST,
               button: 'Check Out',
            })
         )
      case req.params.title === 'addFavorites':
         const countAddFav = await db.bell.count({
            where: {
               title: 'Favorites Bell',
               user_id: req.user.id,
               receiver: req.body.user_id,
               createdAt: { [Op.gt]: TODAY_START, [Op.lt]: NOW },
            },
         })
         if (Number(countAddFav) < 2) {
            bell = await db.bell.create({
               id: uuid(),
               title: 'Favorites Bell',
               body: `User ${req.user.username} added you to favorites.`,
               receiver: req.body.user_id,
               user_id: req.user.id,
            })
            sendEmail(
               user.email,
               `Hi ${req.body.username} ${bell.title}`,
               viewedProfile({
                  title: bell.title,
                  body: bell.body,
                  avatar: process.env.SERVER_HOST + req.user.avatar,
                  link: process.env.WEB_HOST + `/profile/${req.user.username}`,
                  webHost: process.env.WEB_HOST,
                  serverHost: process.env.SERVER_HOST,
                  button: 'Check Out',
               })
            )
         } else {
            return res.send({ message: 'Favorites bell exceed on daily' })
         }
      case req.params.title === 'loveStories':
         bell = await db.bell.create({
            id: uuid(),
            title: 'Love Bell',
            body: `User ${req.user.username} loved your story.`,
            receiver: req.body.user_id,
            user_id: req.user.id,
         })
         sendEmail(
            user.email,
            `Hi ${req.body.username} ${bell.title}`,
            viewedProfile({
               title: bell.title,
               body: bell.body,
               avatar: process.env.SERVER_HOST + req.user.avatar,
               link: process.env.WEB_HOST + `/stories/${req.body.story_id}`,
               webHost: process.env.WEB_HOST,
               serverHost: process.env.SERVER_HOST,
               button: 'Check Out',
            })
         )
      case req.params.title === 'commentStories':
         bell = await db.bell.create({
            id: uuid(),
            title: 'Comment Bell',
            body: `User ${req.user.username} commented your story.`,
            receiver: req.body.user_id,
            user_id: req.user.id,
         })
         sendEmail(
            user.email,
            `Hi ${req.body.username} ${bell.title}`,
            viewedProfile({
               title: bell.title,
               body: bell.body,
               avatar: process.env.SERVER_HOST + req.user.avatar,
               link: process.env.WEB_HOST + `/stories/${req.body.story_id}`,
               webHost: process.env.WEB_HOST,
               serverHost: process.env.SERVER_HOST,
               button: 'Check Out',
            })
         )
      default:
         res.status(201).json(bell)
   }
})
