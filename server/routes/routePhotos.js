const {
   controllerGetPublicPhotos,
   controllerDeletePublicPhotos,
   controllerAddPublicPhotos,
} = require('../controllers/controllerPhotos')
const { auth } = require('../middlewares/middlewareAuth')
const { upload } = require('../utils/middlewareMulter')

const router = require('express').Router()

router.get('/:user_id/:limit/:offset', auth, controllerGetPublicPhotos)
router.post('/public', auth, controllerDeletePublicPhotos)
router.post(
   '/public/add',
   auth,
   upload.array('images', 30),
   controllerAddPublicPhotos
)

module.exports = router
