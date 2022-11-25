const db = require('../models');
const Op = require('sequelize').Op;
const { v4: uuid } = require('uuid');
const asyncHandler = require('express-async-handler');

module.exports.controllerDeleteMessage = asyncHandler(async (req, res) => {
   const roomId = req.params.room_id;
   await db.message.destroy({ where: { roomId } });
   const deleted = await db.room.destroy({ where: { id: roomId } });
   if (deleted) {
      return res.status(200).json({ roomId });
   }
   throw new Error('Something went wrong, try to refresh the site.');
});

module.exports.controllerGetMoreMessages = asyncHandler(async (req, res) => {
   const id = req.user.id;
   const { limit, offset } = req.body;
   const rooms = await db.room.findAndCountAll({
      where: { [Op.or]: [{ receiver: id }, { sender: id }] },
      order: [['createdAt', 'DESC']],
      offset: Number(offset) * Number(limit),
      limit: Number(limit),
      subQuery: false,
      include: [
         { model: db.message, limit: 1, order: [['createdAt', 'DESC']] },
      ],
   });

   res.status(200).json(rooms);
});

module.exports.controllerReadRoomMessages = asyncHandler(async (req, res) => {
   const checkIsEqual = await db.message.findOne({
      where: { roomId: req.body.roomId },
      order: [['createdAt', 'DESC']],
      limit: 1,
   });
   if (checkIsEqual.user_id === req.user.id) {
      return res.send({ message: 'Not allowed to read your own message.' });
   }
   const messages = await db.message.update(
      { isRead: true },
      {
         where: { roomId: req.body.roomId, isRead: false },
      }
   );
   res.status(200).json(messages);
});

module.exports.controllerCountAllMessages = asyncHandler(async (req, res) => {
   let rooms = await db.room.findAll({
      where: {
         [Op.or]: [{ receiver: req.user.id }, { sender: req.user.id }],
      },
   });
   const newRooms = [];
   rooms.map((item) => {
      newRooms.push(item.id);
   });
   const messages = await db.message.count({
      where: {
         roomId: newRooms,
         isRead: false,
         user_id: { [Op.ne]: req.user.id },
      },
   });
   res.status(200).json(messages);
});

module.exports.controllerGetMessages = asyncHandler(async (req, res) => {
   const { user_id, limit, offset } = req.params;
   let room = await db.room.findOne({
      where: {
         [Op.or]: [
            { receiver: user_id, sender: req.user.id },
            { receiver: req.user.id, sender: user_id },
         ],
      },
   });
   if (!room) {
      throw new Error('You have no communication with this user.');
   }
   await db.message.update({ isRead: true }, { where: { roomId: room.id } });
   const messages = await db.message.findAndCountAll({
      where: { roomId: room.id },
      order: [['createdAt', 'DESC']],
      offset: Number(offset) * Number(limit),
      limit: Number(limit),
      subQuery: false,
   });
   res.status(200).json(messages);
});

module.exports.controllerGetAllMessages = asyncHandler(async (req, res) => {
   const id = req.user.id;
   const { limit, offset } = req.params;
   const rooms = await db.room.findAndCountAll({
      where: { [Op.or]: [{ receiver: id }, { sender: id }] },
      order: [['createdAt', 'DESC']],
      offset: Number(offset) * Number(limit),
      limit: Number(limit),
      subQuery: false,
      include: [
         { model: db.message, limit: 1, order: [['createdAt', 'DESC']] },
      ],
   });

   res.status(200).json(rooms);
});

module.exports.controllerSendMessage = asyncHandler(async (req, res) => {
   const { body, attachment, receiver } = req.body;
   const countMessages = await countMessagePerday(req.user.id);
   if (!countMessages) throw new Error('Limit exceed perday');
   const sender = req.user.id;
   if (receiver === req.user.id)
      throw new Error('Receiver should not be the sender.');
   let room = await db.room.findOne({
      where: {
         [Op.or]: [
            { receiver: receiver, sender: sender },
            { receiver: sender, sender: receiver },
         ],
      },
   });
   if (!room) {
      room = await db.room.create({
         id: uuid(),
         sender,
         receiver,
         user_id: sender,
      });
      const data = {
         attachment,
         body,
         roomId: room.id,
         isRead: false,
         receiver,
         user_id: sender,
      };
      const message = await db.message.create(data);
      return res.status(201).json({ ...message.dataValues, receiver });
   }
   if (room) {
      const data = {
         attachment,
         body,
         roomId: room.id,
         isRead: false,
         receiver,
         user_id: sender,
      };
      const message = await db.message.create(data);
      return res.status(201).json({ ...message.dataValues, receiver });
   }
});

module.exports.controllerCountMessagesPerDay = asyncHandler(
   async (req, res) => {
      const response = await countMessagePerday(req.user.id);
      res.send(response);
   }
);

const countMessagePerday = async (id) => {
   const START_DATE_TIME = new Date().setHours(0, 0, 0, 0);
   const END_DATE_TIME = new Date();
   const status = await db.access.findOne({
      where: { user_id: id },
      order: [['createdAt', 'DESC']],
      subQuery: false,
   });
   const diff = Math.abs(new Date() - status.createdAt);
   const days = Math.ceil(diff / (1000 * 3600 * 24));
   if (status.membership === 'a') {
      if (days < 95) return true;
      const counts = await db.message.count({
         where: {
            user_id: id,
            createdAt: { [Op.gt]: START_DATE_TIME, [Op.lt]: END_DATE_TIME },
         },
      });
      if (counts < 2) {
         return true;
      } else {
         return false;
      }
   }
   if (status.membership === 'b') {
      if (days < 185) return true;
      const counts = await db.message.count({
         where: {
            user_id: id,
            createdAt: { [Op.gt]: START_DATE_TIME, [Op.lt]: END_DATE_TIME },
         },
      });
      if (counts < 2) {
         return true;
      } else {
         return false;
      }
   }
   if (status.membership === 'c') {
      if (days < 370) return true;
      const counts = await db.message.count({
         where: {
            user_id: id,
            createdAt: { [Op.gt]: START_DATE_TIME, [Op.lt]: END_DATE_TIME },
         },
      });
      if (counts < 2) {
         return true;
      } else {
         return false;
      }
   }
   if (status.membership === 'f') {
      const counts = await db.message.count({
         where: {
            user_id: id,
            createdAt: { [Op.gt]: START_DATE_TIME, [Op.lt]: END_DATE_TIME },
         },
      });
      if (counts < 2) {
         return true;
      } else {
         return false;
      }
   }
};
