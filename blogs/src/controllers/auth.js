const { signup, login } = require('../services/auth');

const signupController = async (req, res) => {
  const { email, password } = req.body;
  await signup(email, password);
  res.json({ status: 'success' });
};
const loginController = async (req, res) => {};

module.exports = {
  signupController,
  loginController,
};
