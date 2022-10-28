const {
   controllerCreateStory,
   controllerGetAllPublicStories,
   controllerGetAllUserStories,
} = require('../controllers/controllerStories')
const { auth } = require('../middlewares/middlewareAuth')
const { upload } = require('../utils/middlewareMulter')

const router = require('express').Router()

router.get('/user/:limit/:offset', auth, controllerGetAllUserStories)
router.get('/:limit/:offset', controllerGetAllPublicStories)
router.post('/', auth, upload.single('story'), controllerCreateStory)

module.exports = router
