const {
   controllerCreateStory,
   controllerGetAllPublicStories,
   controllerGetAllUserStories,
   controllerGetStoryById,
   controllerDeleteStory,
   controllerCreateStoryText,
} = require('../controllers/controllerStories')
const { auth } = require('../middlewares/middlewareAuth')
const { upload } = require('../utils/middlewareMulter')

const router = require('express').Router()

router.post('/delete', auth, controllerDeleteStory)
router.get('/id/:id', controllerGetStoryById)
router.get('/user/:limit/:offset/:id', controllerGetAllUserStories)
router.get('/:limit/:offset', controllerGetAllPublicStories)
router.put('/', auth, controllerCreateStoryText)
router.post('/', auth, upload.single('story'), controllerCreateStory)

module.exports = router
