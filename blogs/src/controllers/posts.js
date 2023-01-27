const { Post } = require('../db/model');
const {
  getPosts,
  getPostsByID,
  addPost,
  putPost,
  deletePost,
} = require('../services/posts');

/* eslint-disable space-before-function-paren */
/* eslint-disable object-curly-spacing */

const getPostsController = async function (req, res, next) {
  const response = await Post.find({});

  res.json({
    status: 'success',
    code: 200,
    data: {
      response,
    },
  });
};

const getPostByIDController = async function (req, res, next) {
  const { id } = req.params;

  const response = await Post.findById(id);

  if (!response) {
    return res.status(404).json({
      code: 404,
      message: 'Not found',
    });
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data: { response },
  });
};

const addPostController = async (req, res) => {
  const { title, content } = req.body;

  const response = await Post.create({ title, content });

  res.status(201).json({
    status: 'success',
    code: 201,
    data: { response },
  });
};

const putPostController = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  await Post.findByIdAndUpdate(id, {
    $set: { title, content },
  });
  const response = await Post.findById(id);

  res.json({
    status: 'success',
    code: 200,
    data: { response },
  });
};

const deletePostController = async (req, res) => {
  const { id } = req.params;

  await Post.findByIdAndRemove(id);

  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'document deleted',
  });
};

module.exports = {
  getPostsController,
  getPostByIDController,
  addPostController,
  putPostController,
  deletePostController,
};
