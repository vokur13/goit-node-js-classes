const passport = require('passport');
const UserModel = require('../model/userModel');

// const auth = (req, res, next) => {
//   passport.authenticate('jwt', { session: false }, (err, user) => {
//     if (!user || err) {
//       return res.status(401).json({
//         status: 'error',
//         code: 401,
//         message: 'Unauthorized',
//         data: 'Unauthorized',
//       });
//     }
//     const u = UserModel.findById(user._id);
//     req.user = user;
//     next();
//   })(req, res, next);
// };

// module.exports = auth;

const jwt = require('jsonwebtoken');
const { NotAuthorizedError } = require('../helpers/errors');

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      next(
        new NotAuthorizedError(
          'Please provide token in request authorizatio header'
        )
      );
    }
    const [, token] = authorization.split(' ');

    if (!token) {
      next(new NotAuthorizedError('Please provide token'));
    }

    const user = jwt.decode(token, process.env.JWT_SECRET);
    const u = await UserModel.findById(user._id);
    req.user = user;

    // if (!u) {
    //   next(new NotAuthorizedError('Invalid token'));
    // }
    // if (u.token !== token) {
    //   next(new NotAuthorizedError('Invalid token'));
    // }

    // req.user = u;
    req.token = token;
    next();
  } catch (error) {
    next(new NotAuthorizedError('Invalid token'));
  }
};

module.exports = auth;
