const {
   controllerFavoritesAddRemove,
   controllerFavoritesCheck,
   controllerFavoritesGetByLimit,
} = require('../controllers/controllerFavorites');
const { auth } = require('../middlewares/middlewareAuth');
const { isPaid } = require('../middlewares/middlewareIsPaid');

const router = require('express').Router();

router.post('/', auth, isPaid, controllerFavoritesAddRemove);
router.get('/all/:offset/:limit', auth, controllerFavoritesGetByLimit);
router.get('/:profileId', auth, controllerFavoritesCheck);

module.exports = router;
