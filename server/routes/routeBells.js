const {
   controllerViewedProfiles,
   controllerGetBells,
   controllerBellDelete,
   controllerReadBells,
   controllerBellAction,
} = require('../controllers/controllerBells')
const { auth } = require('../middlewares/middlewareAuth')

const router = require('express').Router()

router.put('/read', auth, controllerReadBells)
router.post('/action', auth, controllerBellAction)
router.post('/profile', auth, controllerViewedProfiles)
router.get('/:limit/:offset', auth, controllerGetBells)
router.delete('/:limit/:offset/:id', auth, controllerBellDelete)

module.exports = router
