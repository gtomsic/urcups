const router = require('express').Router();
const { auth } = require('../middlewares/middlewareAuth');
const { upload } = require('../utils/middlewareMulter');

const {
   controllerRegisterUser,
   controllerLoginUser,
   controllerVerifyUser,
   controllerGetSingleUser,
   controllerGetAllUser,
   controllerLogoutUser,
   controllerUpdateAvatar,
   controllerUpdateWallpaper,
   controllerUpdateUserInfo,
   controllerGetUserWithId,
   controllerChangeOnlineStatus,
} = require('../controllers/controllerUser');

router.put('/update-profile-info', auth, controllerUpdateUserInfo);
router.get('/verify/:token', controllerVerifyUser);
router.post('/status', auth, controllerChangeOnlineStatus);
router.post('/login', controllerLoginUser);
router.put('/logout', controllerLogoutUser);
router.post('/avatar', auth, upload.single('avatar'), controllerUpdateAvatar);
router.post(
   '/wallpaper',
   auth,
   upload.single('wallpaper'),
   controllerUpdateWallpaper
);

router.get('/user/:id', auth, controllerGetUserWithId);
router.get('/:username', controllerGetSingleUser);
router.post('/', controllerRegisterUser);
router.get('/', controllerGetAllUser);

module.exports = router;
