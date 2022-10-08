const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const db = require('../models')

module.exports = {
   auth: asyncHandler(async (req, res, next) => {
      let token = req.headers.authorization.startsWith('Bearer')
      if (!token) {
         res.status(401)
         throw new Error('Authorization denied, no token')
      }
      if (token) {
         try {
            const decoded = jwt.verify(
               req.headers.authorization.split(' ')[1],
               process.env.JWT_SECRET
            )
            req.user = await db.user.findOne({
               where: { id: decoded.id },
            })
            next()
         } catch (error) {
            console.error(error.message)
            res.status(401)
            throw new Error('Authorization denied token failed')
         }
      }
   }),
   admin: asyncHandler(async (req, res, next) => {
      if (req.user && req.user.is_admin) {
         next()
      } else {
         res.status(401)
         throw new Error('Administrator access required')
      }
   }),
}
