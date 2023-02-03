const { User } = require('../db/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0//P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const { NotAuthorizedError } = require('../helpers/errors');

const signup = async (email, password) => {
  const user = new User({
    email,
    password: await bcrypt.hash(
      //   myPlaintextPassword,
      password,
      saltRounds
      //   function (err, hash) {
      //     // Store hash in your password DB.
      //   }
    ),
  });
  await user.save();
};

const login = async (id) => {};

module.exports = { signup, login };
