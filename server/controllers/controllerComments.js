const asyncHandler = require('express-async-handler')
const db = require('../models')

module.exports.controllerCreateComments = asyncHandler(async (req, res) => {
   console.log(req.body)
   res.send('Okay')
})
