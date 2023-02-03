const { Post } = require('../db/postsModel');
// const { GetItemByIDError } = require('../helpers/errors');

const getPosts = async () => {
  return await Post.find({});
};

const getPostsByID = async (id) => {
  const response = await Post.findById(id);

  if (!response) {
    // throw new GetItemByIDError('Not found');
    return res.status(404).json({
      code: 404,
      message: 'Not found',
    });
  }

  return response;
};

const addPost = async ({ title, content }) => {
  return await Post.create({ title, content });
};

const putPost = async (id, { title, content }) => {
  await Post.findByIdAndUpdate(id, {
    $set: { title, content },
  });
  return await Post.findById(id);
};

const deletePost = async (id) => {
  return await Post.findByIdAndRemove(id);
};

module.exports = { getPosts, getPostsByID, addPost, putPost, deletePost };
