const {
   controllerCreateStory,
   controllerGetAllPublicStories,
   controllerGetAllUserStories,
   controllerGetStoryById,
   controllerDeleteStory,
} = require('../controllers/controllerStories')
const { auth } = require('../middlewares/middlewareAuth')
const { upload } = require('../utils/middlewareMulter')

const router = require('express').Router()

router.delete('/', auth, controllerDeleteStory)
router.get('/id/:id', controllerGetStoryById)
router.get('/user/:limit/:offset/:id', controllerGetAllUserStories)
router.get('/:limit/:offset', controllerGetAllPublicStories)
router.post('/', auth, upload.single('story'), controllerCreateStory)

module.exports = router
