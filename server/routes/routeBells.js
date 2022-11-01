const { controllerViewedProfiles } = require('../controllers/controllerBells')
const { auth } = require('../middlewares/middlewareAuth')

const router = require('express').Router()

router.post('/profile', auth, controllerViewedProfiles)

module.exports = router
