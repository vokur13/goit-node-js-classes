const { signup, login } = require('../services/auth');

const signupController = async (req, res) => {
  const { email, password } = req.body;
  await signup(email, password);
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      message: 'Registration successful',
    },
  });
};
const loginController = async (req, res) => {
  const token = await login(req, res);
  res.json({
    status: 'success',
    code: 200,
    data: {
      token,
    },
  });
};

module.exports = {
  signupController,
  loginController,
};
