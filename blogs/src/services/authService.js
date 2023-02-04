const UserModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { NotAuthorizedError } = require('../helpers/errors');

const TOP_SECRET = process.env.JWT_SECRET;

const signup = async (email, password) => {
  const user = await new UserModel({
    email,
    password,
  });
  await user.save();
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new NotAuthorizedError(`No user with email ${email} found`);
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError(`Wrong password`);
  }
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET
  );
  return token;
};

const logout = async (req, res) => {};

module.exports = { signup, login };
