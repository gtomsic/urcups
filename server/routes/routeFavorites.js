const {
   controllerFavoritesAddRemove,
   controllerFavoritesCheck,
   controllerFavoritesGetByLimit,
} = require('../controllers/controllerFavorites')
const { auth } = require('../middlewares/middlewareAuth')

const router = require('express').Router()

router.post('/', auth, controllerFavoritesAddRemove)
router.get('/all/:offset/:limit', auth, controllerFavoritesGetByLimit)
router.get('/:profileId', auth, controllerFavoritesCheck)

module.exports = router
