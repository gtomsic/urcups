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
      })
      if (favorites) {
         const userIds = []
         favorites.forEach((item) => {
            userIds.push(item.profileId)
         })
         const getUsers = await db.user.findAndCountAll({
            where: { id: userIds },
            order: [['updatedAt', 'DESC']],
            offset: Number(offset) * Number(limit),
            limit: Number(limit),
            subQuery: false,
         })
         return res.status(201).json(getUsers)
      }
      throw new Error(`You don't have favorites yet.`)
   }
)

// CHECK IF USER IS FAVORITE
module.exports.controllerFavoritesCheck = asyncHandler(async (req, res) => {
   const { profileId } = req.params
   const user_id = req.user.id
   const isFavorite = await db.favorite.findOne({
      where: { profileId, user_id },
   })
   if (isFavorite) {
      res.status(201).send(true)
   } else {
      res.status(201).send(false)
   }
})

// ADD OR REMOVE FAVORITE PROFILE
module.exports.controllerFavoritesAddRemove = asyncHandler(async (req, res) => {
   const { profileId } = req.body
   const user_id = req.user.id
   const checkFavoriteId = await db.favorite.findOne({
      where: { profileId, user_id },
   })
   if (checkFavoriteId) {
      const remove = await db.favorite.destroy({
         where: { profileId, user_id },
      })
      if (remove) {
         return res.status(200).send(false)
      }
   }
   const add = await db.favorite.create({ profileId, user_id })
   res.status(201).send(true)
})
