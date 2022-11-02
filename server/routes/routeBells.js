const {
   controllerViewedProfiles,
   controllerGetBells,
} = require('../controllers/controllerBells')
const { auth } = require('../middlewares/middlewareAuth')

const router = require('express').Router()

router.post('/profile', auth, controllerViewedProfiles)
router.get('/:limit/:offset', auth, controllerGetBells)

module.exports = router
