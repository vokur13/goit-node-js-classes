/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
/* eslint-disable new-cap */
const express = require('express');
const router = new express.Router();

const {
  getPosts,
  getPostByID,
  addPost,
  putPost,
  // patchPost,
  deletePost,
} = require('../controllers/posts');

const {
  addPostValidation,
  // patchPostValidation,
} = require('../middlewares/validation');
const { asyncWrapper } = require('../helpers/apiHelper');
const modelsMiddleware = require('../middlewares/models');
// const { route } = require('../app');

router.use(modelsMiddleware);

router
  .get('/', asyncWrapper(getPosts))
  .get('/:id', asyncWrapper(getPostByID))
  .post('/', addPostValidation, asyncWrapper(addPost))
  .put('/:id', addPostValidation, asyncWrapper(putPost))
  // .patch('/:id', patchPostValidation, patchPost)
  .delete('/:id', asyncWrapper(deletePost));

module.exports = { postsRouter: router };
