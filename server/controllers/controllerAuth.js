const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const db = require('../models')
const { makeToken } = require('../utils/middlewareJwt')

module.exports.controllerUpdatePassword = asyncHandler(async (req, res) => {
   const { email, password } = req.body
   const findEmail = await db.config.findOne({ where: { email } })

   if (findEmail) {
      const hashPassword = await bcrypt.hashSync(password, 10)
      await db.config.update(
         { password: hashPassword },
         { where: { user_id: req.user.id } }
      )
      const token = makeToken(findEmail.user_id)
      const user = await db.user.findOne({ where: { id: req.user.id } })
      res.status(200).json({ ...user.dataValues, token: token })
   } else {
      throw new Error(`Something went wrong please try again later!`)
   }
})

module.exports.controllerRequestNewPassword = asyncHandler(async (req, res) => {
   const { email } = req.body
   const findEmail = await db.config.findOne({ where: { email } })

   if (findEmail) {
      const hashPassword = await bcrypt.hashSync(email, 10)
      db.config.update({ password: hashPassword }, { where: { email } })
      const token = makeToken(findEmail.user_id)
      res.status(200).json({ email: email, token: token })
   } else {
      throw new Error(`Sorry email doesn't exist.`)
   }
})
