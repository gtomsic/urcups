const asyncHandler = require('express-async-handler');
const db = require('../models');

module.exports.isPaid = asyncHandler(async (req, res, next) => {
   const { id } = req.user;
   const status = await db.access.findOne({
      where: { user_id: id },
      order: [['createdAt', 'DESC']],
      subQuery: false,
   });
   const diff = Math.abs(new Date() - status.createdAt);
   const days = Math.ceil(diff / (1000 * 3600 * 24));
   if (status.membership === 'a') {
      if (days > 95)
         throw new Error('Sorry this features is only for supporters users.');
      next();
   }
   if (status.membership === 'b') {
      if (days > 185)
         throw new Error('Sorry this features is only for supporters users.');
      next();
   }
   if (status.membership === 'c') {
      if (days > 370)
         throw new Error('Sorry this features is only for supporters users.');
      next();
   }
   if (status.membership === 'f') {
      const comparedId =
         req.params.user_id || req.params.id || req.body.user_id;
      if (id === comparedId) return next();
      throw new Error('Sorry this features is only for supporters users.');
   }
});
