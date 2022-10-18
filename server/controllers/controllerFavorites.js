const db = require('../models')
const Op = require('sequelize').Op
const { v4: uuid } = require('uuid')
const asyncHandler = require('express-async-handler')

// GET FAVORITES PROFILES BY LIMIT
module.exports.controllerFavoritesGetByLimit = asyncHandler(
   async (req, res) => {
      const { offset, limit } = req.params
      const user_id = req.user.id
      const favorites = await db.favorite.findAll({
         where: { user_id },
         order: [['createdAt', 'DESC']],
         offset: Number(offset) * Number(limit),
         limit: Number(limit),
         subQuery: false,
      })
      res.status(201).json(favorites)
   }
)

// CHECK IF USER IS FAVORITE
module.exports.controllerFavoritesCheck = asyncHandler(async (req, res) => {
   const { profileId } = req.params
   const user_id = req.user.id
   const isFavorite = await db.favorite.findOne({
      where: { profileId, user_id },
   })
   res.status(201).json(isFavorite)
})

// ADD OR REMOVE FAVORITE PROFILE
module.exports.controllerFavoritesAddRemove = asyncHandler(async (req, res) => {
   const { profileId } = req.body
   const user_id = req.user.id
   const checkFavoriteId = await db.favorite.findOne({
      where: { profileId, user_id },
   })
   if (checkFavoriteId) {
      const remove = await db.favorite.delete({
         where: { profileId, user_id },
      })
      return res.status(200).send(remove)
   }
   const add = await db.favorite.create({ profileId, user_id })
   res.status(201).json(add)
})
