const { controllerGetPublicPhotos } = require('../controllers/controllerPhotos')
const { auth } = require('../middlewares/middlewareAuth')

const router = require('express').Router()

router.get('/:user_id', auth, controllerGetPublicPhotos)

module.exports = router
