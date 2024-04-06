const jwt = require('jsonwebtoken');
const secretKey = require('../config/secretKey');
function generateToken(user) {
  const payload = { user };
  const accessToken =  jwt.sign(payload, secretKey,{ expiresIn: '5h' });
  const refreshToken = jwt.sign(payload, secretKey, { expiresIn: '30d' });

  return { accessToken, refreshToken };
}
module.exports = {
    generateToken,
  };