const asyncHandler = require('express-async-handler')
const db = require('../models')
const fs = require('fs')
const { v4: uuid } = require('uuid')
const { imageResize } = require('../utils/middlewareSharp')

module.exports.controllerGetAllUserStories = asyncHandler(async (req, res) => {
   const { limit, offset } = req.params
   const stories = await db.story.findAndCountAll({
      where: { user_id: req.user.id },
      order: [['createdAt', 'DESC']],
      offset: Number(offset) * Number(limit),
      limit: Number(limit),
      subQuery: false,
      include: [
         {
            model: db.love,
            attributes: [],
         },
         {
            model: db.comment,
            attributes: [],
         },
      ],
   })
   if (stories) {
      return res.status(200).json(stories)
   }
   throw new Error('Something went wrong try again later.')
})
module.exports.controllerGetAllPublicStories = asyncHandler(
   async (req, res) => {
      const { limit, offset } = req.params
      const stories = await db.story.findAndCountAll({
         order: [['createdAt', 'DESC']],
         offset: Number(offset) * Number(limit),
         limit: Number(limit),
         subQuery: false,
         include: [
            {
               model: db.love,
               attributes: [],
            },
            {
               model: db.comment,
               attributes: [],
            },
         ],
      })
      if (stories) {
         return res.status(200).json(stories)
      }
      throw new Error('Something went wrong try again later.')
   }
)

module.exports.controllerCreateStory = asyncHandler(async (req, res) => {
   const fileName = uuid()
   const album = req.headers.album
   const title = req.headers.storytitle
   const body = req.headers.storybody
   const path = req.file.path
   await imageResize({
      path,
      width: 1080,
      height: 740,
      quality: 100,
      album,
      location: `./users/${req.user.id}/${album}/${fileName}.jpg`,
      user_id: req.user.id,
   })
   fs.unlinkSync(path)
   const story = await db.story.create({
      image: `/images/${req.user.id}/${album}/${fileName}.jpg`,
      title,
      body,
      user_id: req.user.id,
   })
   if (story) {
      return res.status(201).json(story)
   }
   throw new Error('Something went wrong try again later.')
})
