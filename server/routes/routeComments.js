const {
   controllerCreateComments,
} = require('../controllers/controllerComments')

const { auth } = require('../middlewares/middlewareAuth')

const router = require('express').Router()

router.post('/', auth, controllerCreateComments)

module.exports = router
