const {
   controllerViewedProfiles,
   controllerGetBells,
   controllerBellDelete,
   controllerReadBells,
   controllerBellAction,
   controllerCountUnReadBells,
   controllerLastTwelve,
} = require('../controllers/controllerBells');
const { auth } = require('../middlewares/middlewareAuth');

const router = require('express').Router();

router.get('/last_twelve', auth, controllerLastTwelve);
router.put('/read', auth, controllerReadBells);
router.post('/action', auth, controllerBellAction);
router.post('/profile', auth, controllerViewedProfiles);
router.get('/count', auth, controllerCountUnReadBells);
router.get('/:limit/:offset', auth, controllerGetBells);
router.delete('/:limit/:offset/:id', auth, controllerBellDelete);

module.exports = router;
