const router = require('express').Router()
const {
   controllerSendMessage,
   controllerGetMessages,
   controllerGetRoomsWithMessage,
   controllerCountAllMessages,
   controllerReadRoomMessages,
} = require('../controllers/controllerMessages')
const { auth } = require('../middlewares/middlewareAuth')

router.post('/', auth, controllerSendMessage)
router.post('/read', auth, controllerReadRoomMessages)
router.get('/count', auth, controllerCountAllMessages)
router.get('/room/:limit/:offset/:user_id', auth, controllerGetMessages)
router.get('/:limit/:offset', auth, controllerGetRoomsWithMessage)

module.exports = router
