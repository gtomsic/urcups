const db = require('../models');
const Op = require('sequelize').Op;
const { v4: uuid } = require('uuid');
const asyncHandler = require('express-async-handler');
const { viewedProfile } = require('../public/htmls');
const { sendEmail } = require('../utils/nodemailer');

module.exports.controllerLastTwelve = asyncHandler(async (req, res) => {
   const bells = await db.bell.findAndCountAll({
      where: { receiver: req.user.id },
      order: [['createdAt', 'DESC']],
      offset: 0,
      limit: 12,
      subQuery: false,
   });
   res.status(200).json(bells);
});

module.exports.controllerCountUnReadBells = asyncHandler(async (req, res) => {
   const bells = await db.bell.count({
      where: { receiver: req.user.id, isRead: false },
   });
   res.status(200).json(bells);
});

module.exports.controllerReadBells = asyncHandler(async (req, res) => {
   await db.bell.update(
      { isRead: true },
      { where: { user_id: req.body.user_id } }
   );
   const bells = await db.bell.findAndCountAll({
      where: { receiver: req.user.id, isRead: false },
      order: [['updatedAt', 'DESC']],
      offset: Number(req.body.offset) * Number(req.body.limit),
      limit: Number(req.body.limit),
      subQuery: false,
   });
   res.status(200).json(bells);
});
module.exports.controllerBellDelete = asyncHandler(async (req, res) => {
   await db.bell.destroy({ where: { id: req.params.id } });
   const bells = await db.bell.findAndCountAll({
      where: { receiver: req.user.id },
      order: [['createdAt', 'DESC']],
      offset: Number(req.params.offset) * Number(req.params.limit),
      limit: Number(req.params.limit),
      subQuery: false,
   });
   res.status(200).json(bells);
});

module.exports.controllerGetBells = asyncHandler(async (req, res) => {
   const bells = await db.bell.findAndCountAll({
      where: { receiver: req.user.id },
      order: [['createdAt', 'DESC']],
      offset: Number(req.params.offset) * Number(req.params.limit),
      limit: Number(req.params.limit),
      subQuery: false,
   });
   res.status(200).json(bells);
});

module.exports.controllerBellAction = asyncHandler(async (req, res) => {
   const { subject, title, body, link, user_id } = req.body;
   const user = await db.config.findOne({
      where: { user_id },
   });
   const bell = await db.bell.create({
      id: uuid(),
      link,
      body,
      receiver: user_id,
      user_id: req.user.id,
   });
   sendEmail(
      user.email,
      subject,
      viewedProfile({
         title,
         body,
         avatar: process.env.SERVER_HOST + req.user.avatar,
         link: process.env.WEB_HOST + link,
         webHost: process.env.WEB_HOST,
         serverHost: process.env.SERVER_HOST,
         button: `View Now`,
      })
   );
   res.status(201).json(bell);
});

module.exports.controllerViewedProfiles = asyncHandler(async (req, res) => {
   const START_DATE_TIME = new Date().setHours(0, 0, 0, 0);
   const END_DATE_TIME = new Date();
   const user = await db.config.findOne({
      where: { user_id: req.body.user_id },
   });
   const countViews = await db.bell.count({
      where: {
         user_id: req.user.id,
         receiver: req.body.user_id,
         createdAt: { [Op.gt]: START_DATE_TIME, [Op.lt]: END_DATE_TIME },
      },
   });
   if (Number(countViews) < 1) {
      const bell = await db.bell.create({
         id: uuid(),
         link: `/profile/${req.user.username}`,
         body: `Viewed your profile.`,
         receiver: req.body.user_id,
         user_id: req.user.id,
      });
      sendEmail(
         user.email,
         `${req.user.username} just visit you.`,
         viewedProfile({
            title: req.body.title,
            body: req.body.body,
            avatar: process.env.SERVER_HOST + req.user.avatar,
            link: process.env.WEB_HOST + req.body.link,
            webHost: process.env.WEB_HOST,
            serverHost: process.env.SERVER_HOST,
            button: `View Now`,
         })
      );
      res.status(201).json(bell);
   } else {
      return res.send({ message: 'Viewed exceed per day.' });
   }
});
