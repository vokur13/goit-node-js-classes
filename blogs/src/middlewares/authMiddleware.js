const jwt = require('jsonwebtoken');
const { NotAuthorizedError } = require('../helpers/errors');

const auth = (req, res, next) => {
  const [tokenType, token] = req.headers['authorization'].split(' ');

  if (!token) {
    next(new NotAuthorizedError('Please provide token'));
  }
  try {
    const user = jwt.decode(token, process.env.JWT_SECRET);
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    next(new NotAuthorizedError('Invalid token'));
  }
};

module.exports = { authMiddleware: auth };
