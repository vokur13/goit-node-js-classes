const auth = require('../src/middleware/authMiddleware');
require('dotenv').config();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { NotAuthorizedError } = require('../src/helpers/errors');

const TOP_SECRET = process.env.JWT_SECRET;

describe('AuthMiddlewareTest', () => {
  it('Should call next() and add user and token properties to req. object', () => {
    async (req, res, next) => {
      passport.authenticate('login', async (err, user, info) => {
        try {
          if (err || !user) {
            const error = new Error(`An error occurred, ${err.message}`);

            return next(error);
          }

          req.login(user, { session: false }, async (error) => {
            if (error) return next(error);

            // const body = { _id: user._id, email: user.email };
            // const token = jwt.sign({ user: body }, TOP_SECRET);

            const body = { _id: 'mdfz_kldnklb', email: 'email@mail.com' };
            const token = jwt.sign({ user: body }, TOP_SECRET);

            const mReq = {
              headers: { authorization: `Bearer ${token}` },
            };
            const mRes = {};
            const mockNext = jest.fn();

            auth(mReq, mRes, mockNext);

            expect(mReq.token).toBe(token);
            expect(mReq.user._id).toBe(user._id);
            expect(mReq.user.email).toBe(user.email);
            expect(mockNext).toHaveBeenCalled();

            return res.json({ token });
          });
        } catch (error) {
          return next(error);
        }
      })(req, res, next);
    };
  });

  it('Should call next() with error in case of authorization header is absent', () => {
    async (req, res, next) => {
      passport.authenticate('login', async (err, user, info) => {
        try {
          if (err || !user) {
            const error = new Error(`An error occurred, ${err.message}`);

            return next(error);
          }

          req.login(user, { session: false }, async (error) => {
            if (error) return next(error);

            const mReq = {
              headers: {},
            };
            const mRes = {};
            const mockNext = jest.fn();

            auth(mReq, mRes, mockNext);

            expect(mockNext).toHaveBeenCalledWith(
              new NotAuthorizedError(
                'Please provide a valid token in authorization header'
              )
            );

            return res.json({ token });
          });
        } catch (error) {
          return next(error);
        }
      })(req, res, next);
    };
  });
});
