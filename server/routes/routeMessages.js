const router = require('express').Router();
const {
   controllerSendMessage,
   controllerGetMessages,
   controllerGetAllMessages,
   controllerCountAllMessages,
   controllerReadRoomMessages,
   controllerGetMoreMessages,
   controllerCountMessagesPerDay,
   controllerDeleteMessage,
} = require('../controllers/controllerMessages');
const { auth } = require('../middlewares/middlewareAuth');

router.post('/', auth, controllerSendMessage);
router.get('/perday', auth, controllerCountMessagesPerDay);
router.post('/read', auth, controllerReadRoomMessages);
router.post('/more', auth, controllerGetMoreMessages);
router.delete('/:room_id', auth, controllerDeleteMessage);
router.get('/count', auth, controllerCountAllMessages);
router.get('/room/:limit/:offset/:user_id', auth, controllerGetMessages);
router.get('/:limit/:offset', auth, controllerGetAllMessages);

module.exports = router;
