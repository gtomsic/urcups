const {
   controllerGetSearchOptions,
   controllerAddUpdateSearchOptions,
   controllerSettingsUpdatePassword,
} = require('../controllers/controllerSettings');
const { auth } = require('../middlewares/middlewareAuth');
const { isPaid } = require('../middlewares/middlewareIsPaid');

const router = require('express').Router();

router.post('/', auth, isPaid, controllerAddUpdateSearchOptions);
router.post('/password', auth, controllerSettingsUpdatePassword);
router.get('/', auth, controllerGetSearchOptions);
module.exports = router;
