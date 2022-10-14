const { controllerGetUsersByLimit } = require('../controllers/controllerUsers')

const router = require('express').Router()

router.get('/:limit/:offset', controllerGetUsersByLimit)

module.exports = router
