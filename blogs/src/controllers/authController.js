const passport = require('passport');
const jwt = require('jsonwebtoken');
const { signup, login } = require('../services/authService');

const signupController = async (req, res) => {
  // const { email, password } = req.body;
  // await signup(email, password);
  // await signup();
};

const loginController = async (req, res) => {
  // const token = await login(req, res);
  // res.status(200).json({
  //   status: 'success',
  //   code: 200,
  //   data: {
  //     token,
  //   },
  // });
  await login(req, res);
};

const logoutController = async (req, res) => {};

module.exports = {
  signupController,
  loginController,
  logoutController,
};
