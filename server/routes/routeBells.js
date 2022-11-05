const {
   controllerViewedProfiles,
   controllerGetBells,
   controllerBellDelete,
   controllerReadBells,
   controllerBellAction,
   controllerCountUnReadBells,
} = require('../controllers/controllerBells')
const { auth } = require('../middlewares/middlewareAuth')

const router = require('express').Router()

router.put('/read', auth, controllerReadBells)
router.post('/action', auth, controllerBellAction)
router.post('/profile', auth, controllerViewedProfiles)
router.get('/count', auth, controllerCountUnReadBells)
router.get('/:limit/:offset', auth, controllerGetBells)
router.delete('/:limit/:offset/:id', auth, controllerBellDelete)

module.exports = router
