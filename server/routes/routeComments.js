const {
   controllerCreateComments,
   controllerGetComments,
   controllerCountComments,
   controllerUpdateComments,
   controllerDeleteComments,
} = require('../controllers/controllerComments');

const { auth } = require('../middlewares/middlewareAuth');
const { isPaid } = require('../middlewares/middlewareIsPaid');

const router = require('express').Router();

router.get('/single/:story_id', controllerCountComments);
router.get('/:limit/:offset/:story_id', controllerGetComments);
router.delete('/:id', auth, controllerDeleteComments);
router.put('/', auth, controllerUpdateComments);
router.post('/', auth, isPaid, controllerCreateComments);

module.exports = router;
