const asyncHandler = require('express-async-handler')
const db = require('../models')
const fs = require('fs')

module.exports.controllerDeletePublicPhotos = asyncHandler(async (req, res) => {
   console.log(req.body.photos)
   res.status(200).send({ message: 'Okay' })
})

module.exports.controllerGetPublicPhotos = asyncHandler(async (req, res) => {
   const { user_id, offset, limit } = req.params
   const access = await db.access.findOne({ where: { user_id: req.user.id } })
   if (req.user.id === user_id || access.membership !== 'f') {
      const photos = await db.photo.findAndCountAll({
         where: { user_id: user_id, album: 'public', isPrivate: false },
         order: [['createdAt', 'DESC']],
         offset: Number(offset) * Number(limit),
         limit: Number(limit),
         subQuery: false,
      })
      return res.status(200).json(photos)
   }
   throw new Error(
      'Photo album is only applicable to sponsors users. Please try to be sponsor the site.'
   )
})
