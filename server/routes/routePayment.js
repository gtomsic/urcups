const { controllerGetPaypalId } = require('../controllers/controllerPayment');
const { auth } = require('../middlewares/middlewareAuth');

const router = require('express').Router();

router.get('/', auth, controllerGetPaypalId);

module.exports = router;
