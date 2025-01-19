const jwt = require('jsonwebtoken');
const APP_SECRET = process.env.APP_SECRET;

function getTokenPayload(token) {
  return jwt.verify(token, APP_SECRET); 
}

function getUserId(req, authToken) {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      if (!token) {
        throw new Error('No token found');
      }
      const payload = getTokenPayload(token);
      return payload;
    }
  } else if (authToken) {
    const payload = getTokenPayload(authToken);
    return payload;
  }

  throw new Error('Not authenticated');
}

module.exports = {
  APP_SECRET,
  getUserId
};