'use strict';
const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');

module.exports = {
   sendEmail: asyncHandler(async (to, subject, html) => {
      const transporter = nodemailer.createTransport({
         pool: true,
         host: 'mail.gabrieltomsic.com', // localhost if in cpanel server
         port: 465,
         secure: true, // use TLS
         auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
         },
      });
      // send mail with defined transport object
      let info = await transporter.sendMail({
         from: `Urcups Email Verification <${process.env.MAIL_USER}>`, // sender address
         to: to, // list of receivers
         subject: subject, // Subject line
         html: html, // html body
      });

      console.log('Message sent: %s', info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
   }),
};
