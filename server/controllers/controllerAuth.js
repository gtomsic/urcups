const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { v4: uuid } = require('uuid');
const db = require('../models');
const { makeToken } = require('../utils/middlewareJwt');
const { sendEmail } = require('../utils/nodemailer');
const { viewedProfile } = require('../public/htmls');

module.exports.controllerUpdatePassword = asyncHandler(async (req, res) => {
   const { email, password } = req.body;
   const findEmail = await db.config.findOne({ where: { email } });

   if (findEmail) {
      const hashPassword = await bcrypt.hashSync(password, 10);
      await db.config.update(
         { password: hashPassword },
         { where: { user_id: req.user.id } }
      );
      sendEmail(
         findEmail.email,
         'Password changed successfully',
         viewedProfile({
            title: 'Your request is complete',
            body: 'You can procceed to login bellow.',
            avatar: process.env.SERVER_HOST + '/logo192.png',
            link: process.env.WEB_HOST + `/auth`,
            webHost: process.env.WEB_HOST,
            serverHost: process.env.SERVER_HOST,
            button: `Login`,
         })
      );
      const user = await db.user.findOne({ where: { id: req.user.id } });
      res.status(200).json(user);
   } else {
      throw new Error(`Something went wrong please try again later!`);
   }
});

module.exports.controllerRequestNewPassword = asyncHandler(async (req, res) => {
   const { email } = req.body;
   const temPass = uuid();
   const findEmail = await db.config.findOne({ where: { email } });

   if (findEmail) {
      const hashPassword = await bcrypt.hashSync(temPass, 10);
      db.config.update({ password: hashPassword }, { where: { email } });
      const token = makeToken(findEmail.user_id);
      sendEmail(
         findEmail.email,
         'Password reset request.',
         viewedProfile({
            title: 'Password reset!',
            body: 'Please click the link bellow to proceed',
            avatar: process.env.SERVER_HOST + '/logo192.png',
            link:
               process.env.WEB_HOST +
               `/auth/new_password/${token}/${findEmail.email}`,
            webHost: process.env.WEB_HOST,
            serverHost: process.env.SERVER_HOST,
            button: `Change Password`,
         })
      );
      res.status(200).json({ token: token });
   } else {
      throw new Error(`Sorry email doesn't exist.`);
   }
});
