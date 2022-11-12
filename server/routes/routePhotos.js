const router = require('express').Router();
const {
   controllerGetPublicPhotos,
   controllerDeletePublicPhotos,
   controllerAddPublicPhotos,
   controllerAddPrivatePhotos,
   controllerGetPrivatePhotos,
   controllerDeletePrivatePhotos,
} = require('../controllers/controllerPhotos');
const { auth } = require('../middlewares/middlewareAuth');
const { isPaid } = require('../middlewares/middlewareIsPaid');
const { upload } = require('../utils/middlewareMulter');

router.get(
   '/public/:user_id/:limit/:offset',
   auth,
   isPaid,
   controllerGetPublicPhotos
);
router.post('/public', auth, controllerDeletePublicPhotos);
router.post(
   '/public/add',
   auth,
   upload.array('images', 50),
   controllerAddPublicPhotos
);
router.get(
   '/private/:user_id/:limit/:offset',
   auth,
   controllerGetPrivatePhotos
);
router.post('/private', auth, controllerDeletePrivatePhotos);
router.post(
   '/private/add',
   auth,
   upload.array('images', 50),
   controllerAddPrivatePhotos
);

module.exports = router;
