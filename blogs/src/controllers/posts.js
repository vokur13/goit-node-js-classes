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
  const response = await getPosts();

  res.json({
    status: 'success',
    code: 200,
    data: {
      response,
    },
  });
};

const getPostByIDController = async (req, res, next) => {
  const { id } = req.params;

  const response = await getPostsByID(id);

  res.status(200).json({
    status: 'success',
    code: 200,
    data: { response },
  });
};

const addPostController = async (req, res) => {
  const { title, content } = req.body;

  const response = await addPost({ title, content });

  res.status(201).json({
    status: 'success',
    code: 201,
    data: { response },
  });
};

const putPostController = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const response = await putPost(id, { title, content });

  res.json({
    status: 'success',
    code: 200,
    data: { response },
  });
};

const deletePostController = async (req, res) => {
  const { id } = req.params;

  await deletePost(id);

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
