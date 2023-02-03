/* eslint-disable space-before-function-paren */
/* eslint-disable object-curly-spacing */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

// const passport = require('passport');
// const passportJWT = require('passport-jwt');
// const User = require('./db/userModel');
// const secret = process.env.JWT_SECRET;

// const ExtractJWT = passportJWT.ExtractJwt;
// const Strategy = passportJWT.Strategy;
// const params = {
//   secretOrKey: secret,
//   jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
// };

const { postsRouter } = require('./routes/posts');
const { authRouter } = require('./routes/auth');
const { errorHandler } = require('./helpers/apiHelper');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);

// app.use('/api', routerApi)

// // JWT Strategy
// passport.use(
//   new Strategy(params, function (payload, done) {
//     User.find({ _id: payload.id })
//       .then(([user]) => {
//         if (!user) {
//           return done(new Error('User not found'));
//         }
//         return done(null, user);
//       })
//       .catch((err) => done(err));
//   })
// );

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message });
// });

app.use(errorHandler);

module.exports = app;
