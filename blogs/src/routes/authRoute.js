/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
/* eslint-disable new-cap */
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

const TOP_SECRET = process.env.JWT_SECRET;

const {
  signupController,
  loginController,
  logoutController,
} = require('../controllers/authController');

// const { addPostValidation } = require('../middlewares/validation');
const { asyncWrapper } = require('../helpers/apiHelper');

// router.use(authMiddleware);

// router
//   .post(
//     '/signup',
//     // passport.authenticate('signup', { session: false }),
//     asyncWrapper(signupController)
//   )
//   .post('/login', asyncWrapper(loginController))
//   .get('/logout', asyncWrapper(logoutController));

router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    res.json({
      message: 'Signup successful',
      user: req.user,
    });
  }
);

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      console.log('user', user);
      if (err || !user) {
        const error = new Error(`An error occurred, ${err.message}`);

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, TOP_SECRET);

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = { authRouter: router };
