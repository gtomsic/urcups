const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const db = require('../models');

module.exports.controllerSettingsUpdatePassword = asyncHandler(
   async (req, res) => {
      const { oldPass, newPass, confirmNewPass } = req.body;
      const config = await db.config.findOne({
         where: { user_id: req.user.id },
      });
      const comparedPassword = bcrypt.compareSync(oldPass, config.password);
      if (newPass !== confirmNewPass) throw new Error(`Password don't match.`);
      if (comparedPassword) {
         const hashPass = await bcrypt.hashSync(newPass, 10);
         const response = await db.config.update(
            { password: hashPass },
            { where: { user_id: req.user.id } }
         );
         return res.status(200).json(response);
      } else {
         throw new Error(`Old password don't match.`);
      }
   }
);

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
