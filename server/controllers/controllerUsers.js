const asyncHandler = require('express-async-handler');
const db = require('../models');
const Op = require('sequelize').Op;

// @ USER GET SINGLE PUBLIC USER
// @ PUBLIC
// @ GET
module.exports.controllerGetSinglePublicUser = asyncHandler(
   async (req, res) => {
      const user = await db.user.findOne({ where: { id: req.params.user_id } });
      res.send(user);
   }
);

// @ USER GET USERS BY LIMIT
// @ PUBLIC
// @ GET
module.exports.controllerGetUsersByLimit = asyncHandler(async (req, res) => {
   let settings;
   let users;
   const { offset, limit, sexualOrientation, online, user_id } = req.body;
   if (user_id) {
      settings = await db.setting.findOne({
         where: { user_id },
      });
      const ageGT =
         Number(settings.ageFrom) !== 18 ? Number(settings.ageFrom) : 18;
      const ageLT =
         Number(settings.ageTo) !== 100 ? Number(settings.ageTo) : 100;
      let paidSexualOrientation;
      // FILTERING BETWEEN PAID SEXUAL ORIENTATION
      if (sexualOrientation === 'All' && settings.sexualOrientation === 'All') {
         paidSexualOrientation = {};
      }
      if (sexualOrientation !== 'All' && settings.sexualOrientation !== 'All') {
         paidSexualOrientation = { sexualOrientation: sexualOrientation };
      }
      if (sexualOrientation !== 'All' && settings.sexualOrientation === 'All') {
         paidSexualOrientation = { sexualOrientation: sexualOrientation };
      }
      if (sexualOrientation === 'All' && settings.sexualOrientation !== 'All') {
         paidSexualOrientation = {
            sexualOrientation: settings.sexualOrientation,
         };
      }
      let paidIsOnline;
      if (online && settings.isOnline) {
         paidIsOnline = { isOnline: true };
      }
      if (!online && !settings.isOnline) {
         paidIsOnline = {};
      }
      if (online) {
         paidIsOnline = { isOnline: online };
      }
      if (settings.isOnline) {
         paidIsOnline = { isOnline: settings.isOnline };
      }

      const isPaidUser =
         settings.maritalStatus !== 'All'
            ? {
                 maritalStatus: settings.maritalStatus,
                 ...paidSexualOrientation,
                 ...paidIsOnline,
                 age: {
                    [Op.gt]: ageGT,
                    [Op.lt]: ageLT,
                 },
              }
            : {
                 ...paidSexualOrientation,
                 age: {
                    [Op.gt]: ageGT,
                    [Op.lt]: ageLT,
                 },
              };

      // REQUEST FOR ALL ONLINE USERS
      // WITH AGE RANGE AND SEXUAL ORIENTATION FILTERS
      if (online && sexualOrientation !== 'All') {
         users = await db.user.findAndCountAll({
            order: [['updatedAt', 'DESC']],
            offset: Number(offset) * Number(limit),
            limit: Number(limit),
            subQuery: false,
            where: {
               isOnline: online,
               ...isPaidUser,
            },
         });
         return res.status(200).json(users);
      }
      // REQUEST FOR ALL USERS
      // WITH AGE RANGE AND SEXUAL ORIENTATION FILTER
      if (sexualOrientation !== 'All') {
         users = await db.user.findAndCountAll({
            order: [['updatedAt', 'DESC']],
            offset: Number(offset) * Number(limit),
            limit: Number(limit),
            subQuery: false,
            where: {
               ...isPaidUser,
            },
         });
         return res.status(200).json(users);
      }
      // REQUEST FOR ALL ONLINE USERS
      // WITH AGE RANGE
      if (online) {
         users = await db.user.findAndCountAll({
            order: [['updatedAt', 'DESC']],
            offset: Number(offset) * Number(limit),
            limit: Number(limit),
            subQuery: false,
            where: {
               isOnline: online,
               ...isPaidUser,
            },
         });
         return res.status(200).json(users);
      }
      // REQUEST FOR ALL USERS
      // WITH AGE RANGE
      users = await db.user.findAndCountAll({
         order: [['updatedAt', 'DESC']],
         offset: Number(offset) * Number(limit),
         limit: Number(limit),
         subQuery: false,
         where: {
            ...isPaidUser,
         },
      });
      return res.status(200).json(users);
   } else {
      // REQUEST FOR ALL ONLINE USERS
      // WITH SEXUAL ORIENTATION FILTERS
      if (online && sexualOrientation !== 'All') {
         users = await db.user.findAndCountAll({
            order: [['updatedAt', 'DESC']],
            offset: Number(offset) * Number(limit),
            limit: Number(limit),
            subQuery: false,
            where: {
               isOnline: online,
               sexualOrientation: sexualOrientation,
            },
         });
         return res.status(200).json(users);
      }
      // REQUEST FOR ALL USERS
      // WITH SEXUAL ORIENTATION FILTER
      if (sexualOrientation !== 'All') {
         users = await db.user.findAndCountAll({
            order: [['updatedAt', 'DESC']],
            offset: Number(offset) * Number(limit),
            limit: Number(limit),
            subQuery: false,
            where: {
               sexualOrientation: sexualOrientation,
            },
         });
         return res.status(200).json(users);
      }
      // REQUEST FOR ALL ONLINE USERS
      if (online) {
         users = await db.user.findAndCountAll({
            order: [['updatedAt', 'DESC']],
            offset: Number(offset) * Number(limit),
            limit: Number(limit),
            subQuery: false,
            where: {
               isOnline: online,
            },
         });
         return res.status(200).json(users);
      }
      // REQUEST FOR ALL USERS
      users = await db.user.findAndCountAll({
         order: [['updatedAt', 'DESC']],
         offset: Number(offset) * Number(limit),
         limit: Number(limit),
         subQuery: false,
      });
      return res.status(200).json(users);
   }
});
