const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dataSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('post', dataSchema);

module.exports = {
  Post,
};
