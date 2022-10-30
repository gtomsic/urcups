const {
   controllerCreateComments,
   controllerGetComments,
} = require('../controllers/controllerComments')

const { auth } = require('../middlewares/middlewareAuth')

const router = require('express').Router()

router.get('/:limit/:offset/:story_id', auth, controllerGetComments)
router.post('/', auth, controllerCreateComments)

module.exports = router
