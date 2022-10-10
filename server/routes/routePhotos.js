const {
   controllerGetPublicPhotos,
   controllerDeletePublicPhotos,
} = require('../controllers/controllerPhotos')
const { auth } = require('../middlewares/middlewareAuth')

const router = require('express').Router()

router.get('/:user_id/:limit/:offset', auth, controllerGetPublicPhotos)
router.post('/public', auth, controllerDeletePublicPhotos)

module.exports = router
