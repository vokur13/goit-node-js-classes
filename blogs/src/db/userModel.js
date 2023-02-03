const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0//P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const { NotAuthorizedError } = require('../helpers/errors');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  title: String,
  bio: String,
  created: { type: Date, default: Date.now() },
});

userSchema.pre('save', async function () {
  if (this.$isNew) {
    this.password = await bcrypt.hash(
      //   myPlaintextPassword,
      this.password,
      saltRounds
      //   function (err, hash) {
      //     // Store hash in your password DB.
      //   }
    );
  }
});

const User = mongoose.model('user', userSchema);

module.exports = {
  User,
};
