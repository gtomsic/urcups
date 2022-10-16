const {
   controllerSendMessage,
   controllerGetMessages,
   controllerGetRoomsWithMessage,
   controllerCountAllMessages,
} = require('../controllers/controllerMessages')
const { auth } = require('../middlewares/middlewareAuth')

const router = require('express').Router()

router.post('/', auth, controllerSendMessage)
router.get('/count', auth, controllerCountAllMessages)
router.get('/room/:limit/:offset/:user_id', auth, controllerGetMessages)
router.get('/:limit/:offset', auth, controllerGetRoomsWithMessage)

module.exports = router
