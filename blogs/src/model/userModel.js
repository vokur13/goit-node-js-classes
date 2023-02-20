const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    posts: [{ type: Schema.Types.ObjectId, ref: 'post' }],
    avatarURL: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  const user = this;
  if (this.isNew || this.isModified) {
    const hash = await bcrypt.hash(this.password, saltRounds);
    this.password = hash;
    next();
  }
});

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

// Create a virtual property `domain` that's computed from `email`.
UserSchema.virtual('domain').get(function () {
  return this.email.slice(this.email.indexOf('@') + 1);
});

const UserModel = mongoose.model('user', UserSchema);

// let doc = await User.create({ email: 'test@gmail.com' });
// // `domain` is now a property on User documents.
// doc.domain; // 'gmail.com'

module.exports = UserModel;
