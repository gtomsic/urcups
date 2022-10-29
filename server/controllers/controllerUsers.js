const asyncHandler = require('express-async-handler')
const db = require('../models')

module.exports.controllerGetUsersByLimit = asyncHandler(async (req, res) => {
   const { offset, limit, sexualOrientation, online } = req.body
   console.log({ online: online })
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
