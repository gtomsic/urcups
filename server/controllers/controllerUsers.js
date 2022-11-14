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
   const { offset, limit, sexualOrientation, online, user_id } = req.body;
   let settings;
   let users;
   if (user_id) {
      settings = await db.setting.findOne({
         where: { user_id },
      });
   }
   const so =
      settings?.sexualOrientation !== 'All'
         ? settings.sexualOrientation
         : sexualOrientation;

   if (online === 'false' && sexualOrientation !== 'All') {
      users = await db.user.findAndCountAll({
         order: [['updatedAt', 'DESC']],
         offset: Number(offset) * Number(limit),
         limit: Number(limit),
         subQuery: false,
         where: {
            isOnline: false,
            sexualOrientation: so,
            maritalStatus:
               settings.maritalStatus === 'All' ? null : settings.maritalStatus,
            age: { [Op.gt]: 50, [Op.lt]: Number(settings.ageTo) },
         },
      });
      return res.status(200).json(users);
   }

   if (online && sexualOrientation !== 'All') {
      users = await db.user.findAndCountAll({
         order: [['updatedAt', 'DESC']],
         offset: Number(offset) * Number(limit),
         limit: Number(limit),
         subQuery: false,
         where: {
            isOnline: online,
            sexualOrientation: so,
            age: {
               [Op.gt]:
                  Number(settings.ageFrom) !== 18
                     ? Number(settings.ageFrom)
                     : 18,
               [Op.lt]: Number(settings.ageTo),
            },
         },
      });
      return res.status(200).json(users);
   }

   if (online) {
      users = await db.user.findAndCountAll({
         order: [['updatedAt', 'DESC']],
         offset: Number(offset) * Number(limit),
         limit: Number(limit),
         subQuery: false,
         where: { isOnline: online },
      });
      return res.status(200).json(users);
   }

   users = await db.user.findAndCountAll({
      order: [['updatedAt', 'DESC']],
      offset: Number(offset) * Number(limit),
      limit: Number(limit),
      subQuery: false,
   });
   return res.status(200).json(users);
});
