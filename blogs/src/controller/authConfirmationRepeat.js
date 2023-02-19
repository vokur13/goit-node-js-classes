const UserModel = require('../model/userModel');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const authConfirmationRepeat = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      status: 400,
      message: 'missing required field email',
    });
  }

  try {
    const user = await UserModel.findOne({ email });

    if (user.verify) {
      return res.status(400).json({
        status: 400,
        message: 'Verification has already been passed',
      });
    }

    const msg = {
      to: user.email, // Change to your recipient
      from: 'vokur@icloud.com', // Change to your verified sender
      subject: 'Email verification request repeat',
      text: `Please, confirm your email with request POST http://localhost:8081/api/auth/users/verify/${user.verificationToken}`,
      html: `<strong>Please, confirm your email with request POST http://localhost:8081/api/auth/users/verify/${user.verificationToken}</strong>`,
    };

    await sgMail.send(msg);

    res.status(200).json({
      status: 200,
      message: 'Verification email re-sent',
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = authConfirmationRepeat;
