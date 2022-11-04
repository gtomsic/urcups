const asyncHandler = require('express-async-handler')
const db = require('../models')

// @ USER GET SINGLE PUBLIC USER
// @ PUBLIC
// @ GET
module.exports.controllerGetSinglePublicUser = asyncHandler(
   async (req, res) => {
      const user = await db.user.findOne({ where: { id: req.params.user_id } })
      res.send(user)
   }
)

// @ USER GET USERS BY LIMIT
// @ PUBLIC
// @ GET
module.exports.controllerGetUsersByLimit = asyncHandler(async (req, res) => {
   const { offset, limit, sexualOrientation, online } = req.body
   let users
   if (online === 'false' && sexualOrientation !== 'All') {
      users = await db.user.findAndCountAll({
         order: [['updatedAt', 'DESC']],
         offset: Number(offset) * Number(limit),
         limit: Number(limit),
         subQuery: false,
         where: { isOnline: online, sexualOrientation: sexualOrientation },
      })
      return res.status(200).json(users)
   }
   if (online === true && sexualOrientation !== 'All') {
      users = await db.user.findAndCountAll({
         order: [['updatedAt', 'DESC']],
         offset: Number(offset) * Number(limit),
         limit: Number(limit),
         subQuery: false,
         where: { isOnline: online, sexualOrientation: sexualOrientation },
      })
      return res.status(200).json(users)
   }
   if (online) {
      users = await db.user.findAndCountAll({
         order: [['updatedAt', 'DESC']],
         offset: Number(offset) * Number(limit),
         limit: Number(limit),
         subQuery: false,
         where: { isOnline: online },
      })
      return res.status(200).json(users)
   }
   if (sexualOrientation !== 'All') {
      users = await db.user.findAndCountAll({
         order: [['updatedAt', 'DESC']],
         offset: Number(offset) * Number(limit),
         limit: Number(limit),
         subQuery: false,
         where: { sexualOrientation },
      })
      return res.status(200).json(users)
   }

   users = await db.user.findAndCountAll({
      order: [['updatedAt', 'DESC']],
      offset: Number(offset) * Number(limit),
      limit: Number(limit),
      subQuery: false,
   })
   return res.status(200).json(users)
})
