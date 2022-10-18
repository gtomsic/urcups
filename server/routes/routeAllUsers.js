const router = require('express').Router()

const { controllerGetUsersByLimit } = require('../controllers/controllerUsers')

router.get('/:limit/:offset', controllerGetUsersByLimit)

module.exports = router
