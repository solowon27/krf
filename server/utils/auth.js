const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET || 'myfallbacksecret'; // MUST be an env var!
const expiration = process.env.JWT_EXPIRATION || '2h';

module.exports = {
  // Middleware function for Express routes
  authMiddleware: function (req, res, next) {
  let token = req.headers.authorization;

  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7);
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data; // ✅ Attach user, but do NOT block if invalid
    } catch (err) {
      console.warn("JWT verification failed:", err.message);
      req.user = null;
    }
  }

  // ✅ Always proceed — never block here
  next();
},
  // Function to sign a token
  signToken: function ({ _id, firstName, email, role }) { // Include role in payload
    const payload = { _id, firstName, email, role }; // Make sure role is passed here
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};