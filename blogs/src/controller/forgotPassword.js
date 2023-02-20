const UserModel = require('../model/userModel');

const TOP_SECRET = process.env.JWT_SECRET;

const { v4: uuidv4 } = require('uuid');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await UserModel.findOne({ email, verify: true });

  if (!user) {
    return res.status(404).json({
      status: 404,
      message: 'User not found',
    });
  }

  const tmpPassword = uuidv4(email + TOP_SECRET);

  user.password = tmpPassword;
  await user.save();

  const msg = {
    to: email, // Change to your recipient
    from: 'vokur@icloud.com', // Change to your verified sender
    subject: 'Password recovery',
    text: `Your temporary password: ${tmpPassword}`,
    html: `<strong>Your temporary password: ${tmpPassword}</strong>`,
  };

  await sgMail.send(msg);
};

module.exports = forgotPassword;
