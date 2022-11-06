const {
   controllerRequestNewPassword,
   controllerUpdatePassword,
} = require('../controllers/controllerAuth');
const { auth } = require('../middlewares/middlewareAuth');

const router = require('express').Router();

router.put('/', auth, controllerUpdatePassword);
router.post('/', controllerRequestNewPassword);

module.exports = router;
