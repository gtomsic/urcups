const router = require('express').Router()

const { controllerGetUsersByLimit } = require('../controllers/controllerUsers')

router.post('/', controllerGetUsersByLimit)

module.exports = router
