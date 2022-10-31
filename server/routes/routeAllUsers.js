const router = require('express').Router()

const {
   controllerGetUsersByLimit,
   controllerGetSinglePublicUser,
} = require('../controllers/controllerUsers')

router.post('/', controllerGetUsersByLimit)
router.get('/:user_id', controllerGetSinglePublicUser)

module.exports = router
