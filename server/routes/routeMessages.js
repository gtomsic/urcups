const router = require('express').Router()
const {
   controllerSendMessage,
   controllerGetMessages,
   controllerGetAllMessages,
   controllerCountAllMessages,
   controllerReadRoomMessages,
   controllerGetMoreMessages,
} = require('../controllers/controllerMessages')
const { auth } = require('../middlewares/middlewareAuth')

router.post('/', auth, controllerSendMessage)
router.post('/read', auth, controllerReadRoomMessages)
router.post('/more', auth, controllerGetMoreMessages)
router.get('/count', auth, controllerCountAllMessages)
router.get('/room/:limit/:offset/:user_id', auth, controllerGetMessages)
router.get('/:limit/:offset', auth, controllerGetAllMessages)

module.exports = router
