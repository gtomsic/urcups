const {
   controllerGetPaypalId,
   controllerSupportPayment,
   controllerGetPaymentAccess,
} = require('../controllers/controllerPayment');
const { auth } = require('../middlewares/middlewareAuth');

const router = require('express').Router();

router.get('/status', auth, controllerGetPaymentAccess);
router.post('/', auth, controllerSupportPayment);
router.get('/', auth, controllerGetPaypalId);

module.exports = router;
