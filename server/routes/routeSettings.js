const {
   controllerGetSearchOptions,
   controllerAddUpdateSearchOptions,
} = require('../controllers/controllerSettings');
const { auth } = require('../middlewares/middlewareAuth');
const { isPaid } = require('../middlewares/middlewareIsPaid');

const router = require('express').Router();

router.post('/', auth, isPaid, controllerAddUpdateSearchOptions);
router.get('/', auth, controllerGetSearchOptions);
module.exports = router;
