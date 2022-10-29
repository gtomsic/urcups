const {
   controllerAddRemoveLoves,
   controllerCheckLove,
   controllerCountLoves,
} = require('../controllers/conrtrollerLoves')
const { auth } = require('../middlewares/middlewareAuth')

const router = require('express').Router()

router.get('/counts/:story_id', controllerCountLoves)
router.get('/:story_id', auth, controllerCheckLove)
router.post('/', auth, controllerAddRemoveLoves)

module.exports = router
