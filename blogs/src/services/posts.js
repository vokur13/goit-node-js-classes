const { Post } = require('../db/postsModel');

const getPosts = async (owner) => {
  return await Post.find({ owner });
};

const getPostsByID = async (id, owner) => {
  const response = await Post.findOne({ _id: id, owner });

  if (!response) {
    return res.status(404).json({
      code: 404,
      message: 'Not found',
    });
  }

  return response;
};

const addPost = async ({ title, content }, owner) => {
  return await Post.create({ title, content, owner });
};

const putPost = async (id, { title, content }, owner) => {
  await Post.findOneAndUpdate(
    { _id: id, owner },
    {
      $set: { title, content },
    }
  );
  return await Post.findOne({ _id: id, owner });
};

const deletePost = async (id, owner) => {
  return await Post.findOneAndRemove({ _id: id, owner });
};

module.exports = { getPosts, getPostsByID, addPost, putPost, deletePost };
