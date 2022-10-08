const jwt = require('jsonwebtoken');

module.exports.makeToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};
