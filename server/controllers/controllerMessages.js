const db = require('../models')
const Op = require('sequelize').Op
const { v4: uuid } = require('uuid')
const asyncHandler = require('express-async-handler')

module.exports.controllerReadRoomMessages = asyncHandler(async (req, res) => {
   const messages = await db.message.update(
      { isRead: true },
      {
         where: { roomId: req.body.roomId, isRead: false },
      }
   )
   res.status(200).json(messages)
})

module.exports.controllerCountAllMessages = asyncHandler(async (req, res) => {
   let rooms = await db.room.findAll({
      where: {
         [Op.or]: [{ receiver: req.user.id }, { sender: req.user.id }],
      },
   })
   const newRooms = []
   rooms.map((item) => {
      newRooms.push(item.id)
   })
   const messages = await db.message.count({
      where: { roomId: newRooms, isRead: false },
   })
   res.status(200).json(messages)
})

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
      throw new Error('You have no communication with this user yet!')
   }
   await db.message.update({ isRead: true }, { where: { roomId: room.id } })
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
   if (receiver === req.user.id)
      throw new Error('Receiver should not be the sender.')
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
      return res.status(201).json({ ...message.dataValues, receiver })
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
      return res.status(201).json({ ...message.dataValues, receiver })
   }
})
