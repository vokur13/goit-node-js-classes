const { string } = require('joi');
const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  created: { type: Date, default: Date.now() },
  owner: {
    type: String,
    required: true,
  },
  // owner: {
  //   type: SchemaTypes.ObjectId,
  //   ref: 'user',
  // },
});

const Post = mongoose.model('post', dataSchema);

module.exports = {
  Post,
};
