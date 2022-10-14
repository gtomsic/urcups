const db = require('../models')
const Op = require('sequelize').Op
const { v4: uuid } = require('uuid')
const asyncHandler = require('express-async-handler')
const user = require('../models/user')

module.exports.controllerGetMessages = asyncHandler(async (req, res) => {
   const { user_id, limit, offset } = req.params
   let room = await db.room.findOne({
      where: {
         [Op.or]: [
            { receiver: user_id, sender: req.user.id },
            { receiver: req.user.id, sender: user_id },
         ],
      },
   })
   if (!room) {
      room = await db.room.create({
         id: uuid(),
         sender: req.user.id,
         receiver: user_id,
         user_id: req.user.id,
      })
   }
   const messages = await db.message.findAll({
      where: { roomId: room.id },
      order: [['createdAt', 'DESC']],
      offset: Number(offset) * Number(limit),
      limit: Number(limit),
      subQuery: false,
   })
   res.status(200).json(messages)
})
module.exports.controllerGetRoomsWithMessage = asyncHandler(
   async (req, res) => {
      const id = req.user.id
      const { limit, offset } = req.params
      const rooms = await db.room.findAll({
         where: { [Op.or]: [{ receiver: id }, { sender: id }] },
         order: [['createdAt', 'DESC']],
         offset: Number(offset) * Number(limit),
         limit: Number(limit),
         subQuery: false,
         include: [
            { model: db.message, limit: 1, order: [['createdAt', 'DESC']] },
         ],
      })
      res.status(200).json(rooms)
   }
)

module.exports.controllerSendMessage = asyncHandler(async (req, res) => {
   const { body, attachment, receiver } = req.body
   const sender = req.user.id
   let room = await db.room.findOne({
      where: {
         [Op.or]: [
            { receiver: receiver, sender: sender },
            { receiver: sender, sender: receiver },
         ],
      },
   })
   if (!room) {
      room = await db.room.create({
         id: uuid(),
         sender,
         receiver,
         user_id: sender,
      })
      const data = {
         attachment,
         body,
         roomId: room.id,
         isRead: false,
         user_id: sender,
      }
      const message = await db.message.create(data)
      return res.status(201).json(message)
   }
   if (room) {
      const data = {
         attachment,
         body,
         roomId: room.id,
         isRead: false,
         user_id: sender,
      }
      const message = await db.message.create(data)
      return res.status(201).json(message)
   }
})
