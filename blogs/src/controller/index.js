const { uploadController } = require('./static');
const { avatarUpdateController } = require('./users');
const authConfirmation = require('./authConfirmation');
const authConfirmationRepeat = require('./authConfirmationRepeat');
const forgotPassword = require('./forgotPassword');

module.exports = {
  uploadController,
  avatarUpdateController,
  authConfirmation,
  authConfirmationRepeat,
  forgotPassword,
};
