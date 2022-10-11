const asyncHandler = require('express-async-handler')
const db = require('../models')
const fs = require('fs')
const { v4: uuid } = require('uuid')
const { imageResize } = require('../utils/middlewareSharp')

module.exports.controllerAddPublicPhotos = asyncHandler(async (req, res) => {
   const album = req.headers.album
   const toPost = []
   for (let i = 0; i < req.files.length; i++) {
      const fileName = uuid()
      const location = `users/${req.user.id}/${album}/${fileName}.jpg`
      const path = req.files[i].path
      await imageResize({
         path,
         with: 1080,
         height: null,
         quality: 100,
         album,
         location,
         user_id: req.user.id,
      })
      toPost.push({
         fileName: `/images/${req.user.id}/${album}/${fileName}.jpg`,
         isPrivate: false,
         album,
         user_id: req.user.id,
      })
      fs.unlinkSync(path)
   }
   const createPhotos = await db.photo.bulkCreate(toPost)
   res.status(201).json(createPhotos)
})

module.exports.controllerDeletePublicPhotos = asyncHandler(async (req, res) => {
   const { photos } = req.body
   const response = await db.photo.destroy({ where: { fileName: photos } })
   if (response) {
      photos.map((photo) => {
         const changeFolder = photo.replace('/images', 'users')
         ;['avatar', 'thumbnail', 'wallpaper', 'public'].map((item) => {
            const toDelete = changeFolder.replace('public', item)
            console.log(toDelete)
            if (fs.existsSync(toDelete)) {
               fs.unlinkSync(toDelete)
            }
         })
      })
   }
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
