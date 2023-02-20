const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

const TOP_SECRET = process.env.JWT_SECRET;

const { authConfirmation } = require('../controller');
const { authConfirmationRepeat } = require('../controller');
const { forgotPassword } = require('../controller');
const { asyncWrapper } = require('../helpers/apiHelper');

router
  .post(
    '/signup',
    passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
      res.json({
        message: 'Signup successful',
        // user: req.user,
        user: req.user,
      });
    }
  )
  .post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
      try {
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
  })
  .get('/users/verify/:verificationToken', asyncWrapper(authConfirmation))
  .post('/users/verify', asyncWrapper(authConfirmationRepeat))
  .post('/forgot_password', asyncWrapper(forgotPassword));

module.exports = { authRoutes: router };
