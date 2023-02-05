const passport = require('passport');

const auth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Unauthorized',
        data: 'Unauthorized',
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = auth;

// const jwt = require('jsonwebtoken');
// const { NotAuthorizedError } = require('../helpers/errors');

// const auth = (req, res, next) => {
//   const [tokenType, token] = req.headers['authorization'].split(' ');

//   if (!token) {
//     next(new NotAuthorizedError('Please provide token'));
//   }
//   try {
//     const user = jwt.decode(token, process.env.JWT_SECRET);
//     req.user = user;
//     req.token = token;
//     next();
//   } catch (error) {
//     next(new NotAuthorizedError('Invalid token'));
//   }
// };

// module.exports = { authMiddleware: auth };
