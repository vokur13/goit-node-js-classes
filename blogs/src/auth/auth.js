const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../model/userModel');

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const gravatar = require('gravatar');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const TOP_SECRET = process.env.JWT_SECRET;

const { v4: uuidv4 } = require('uuid');

passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      const verificationToken = uuidv4(email + TOP_SECRET);

      const msg = {
        to: email, // Change to your recipient
        from: 'vokur@icloud.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: `Please, confirm your email with request POST http://localhost:8081/api/auth/users/verify/${verificationToken}`,
        html: `<strong>Please, confirm your email with request POST http://localhost:8081/api/auth/users/verify/${verificationToken}</strong>`,
        html: `<strong>Please, <a href="http://localhost:8081/api/auth/users/verify/${verificationToken}">confirm</a> your email</strong>`,
      };

      try {
        const user = await UserModel.create({
          email,
          password,
          avatarURL: gravatar.url(
            email,
            { s: '200', r: 'pg', d: 'wavatar' },
            false
          ),
          verificationToken,
        });

        await sgMail.send(msg);

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email, verify: true });

        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: 'Wrong Password' });
        }

        return done(null, user, { message: 'Logged in Successfully' });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: TOP_SECRET,
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token'),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
