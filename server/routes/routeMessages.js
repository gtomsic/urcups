const {
   controllerSendMessage,
   controllerGetMessages,
   controllerGetRoomsWithMessage,
} = require('../controllers/controllerMessages')
const { auth } = require('../middlewares/middlewareAuth')

const router = require('express').Router()

router.post('/', auth, controllerSendMessage)
router.get('/:limit/:offset', auth, controllerGetRoomsWithMessage)
router.get('/room/:limit/:offset/:user_id', auth, controllerGetMessages)

module.exports = router
