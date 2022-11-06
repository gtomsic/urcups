const {
   controllerRequestNewPassword,
   controllerUpdatePassword,
} = require('../controllers/controllerAuth')

const router = require('express').Router()

router.put('/', controllerUpdatePassword)
router.post('/', controllerRequestNewPassword)

module.exports = router
