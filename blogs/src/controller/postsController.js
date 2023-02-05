const {
  getPosts,
  getPostsByID,
  addPost,
  putPost,
  deletePost,
} = require('../services/postsService');

/* eslint-disable space-before-function-paren */
/* eslint-disable object-curly-spacing */

const getPostsController = async function (req, res, next) {
  const { _id } = req.user;
  let { skip = 0, limit = 5 } = req.query;
  limit = parseInt(limit) > 10 ? 10 : parseInt(limit);
  skip = parseInt(skip);
  const response = await getPosts(_id, { skip, limit });

  res.json({
    status: 'success',
    code: 200,
    skip,
    limit,
    data: {
      response,
    },
  });
};

const getPostByIDController = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  const response = await getPostsByID(id, _id);

  res.status(200).json({
    status: 'success',
    code: 200,
    data: { response },
  });
};

const addPostController = async (req, res) => {
  const { _id } = req.user;
  const { title, content } = req.body;

  const response = await addPost({ title, content }, _id);

  res.status(201).json({
    status: 'success',
    code: 201,
    data: { response },
  });
};

const putPostController = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const { title, content } = req.body;

  const response = await putPost(id, { title, content }, _id);

  res.json({
    status: 'success',
    code: 200,
    data: { response },
  });
};

const deletePostController = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  await deletePost(id, _id);

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
