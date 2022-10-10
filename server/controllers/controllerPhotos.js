const asyncHandler = require('express-async-handler')
const db = require('../models')

module.exports.controllerGetPublicPhotos = asyncHandler(async (req, res) => {
   const { user_id } = req.params
   const access = await db.access.findOne({ where: { user_id: req.user.id } })
   if (req.user.id === user_id || access.membership !== 'f') {
      const photos = await db.photo.findAll({
         where: { user_id: user_id, album: 'public', isPrivate: false },
         order: [['createdAt', 'DESC']],
      })
      return res.status(200).json(photos)
   }
   throw new Error(
      'Photo album is only applicable to sponsors users. Please try to be sponsor the site.'
   )
})
