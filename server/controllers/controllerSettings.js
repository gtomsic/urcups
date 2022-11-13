const asyncHandler = require('express-async-handler');
const db = require('../models');

module.exports.controllerGetSearchOptions = asyncHandler(async (req, res) => {
   const settings = await db.setting.findOne({
      where: { user_id: req.user.id },
   });
   res.status(200).json(settings);
});

module.exports.controllerAddUpdateSearchOptions = asyncHandler(
   async (req, res) => {
      const id = req.user.id;
      let settings = await db.setting.findOne({ where: { user_id: id } });
      if (settings) {
         const add = await db.setting.update(req.body, {
            where: { user_id: id },
         });
         settings = await db.setting.findOne({ where: { user_id: id } });
         return res.status(200).json(settings);
      } else {
         settings = await db.setting.create(req.body);
         return res.status(201).json(settings);
      }
   }
);
