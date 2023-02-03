/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
/* eslint-disable new-cap */
const express = require('express');
const router = new express.Router();

const { signupController, loginController } = require('../controllers/auth');

// const { addPostValidation } = require('../middlewares/validation');
const { asyncWrapper } = require('../helpers/apiHelper');

router
  .post('/signup', asyncWrapper(signupController))
  .post('/login', asyncWrapper(loginController));

module.exports = { authRouter: router };
