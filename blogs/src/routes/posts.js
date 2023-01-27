/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
/* eslint-disable new-cap */
const express = require('express');
const router = new express.Router();

const {
  getPostsController,
  getPostByIDController,
  addPostController,
  putPostController,
  deletePostController,
} = require('../controllers/posts');

const { addPostValidation } = require('../middlewares/validation');
const { asyncWrapper } = require('../helpers/apiHelper');

router
  .get('/', asyncWrapper(getPostsController))
  .get('/:id', asyncWrapper(getPostByIDController))
  .post('/', addPostValidation, asyncWrapper(addPostController))
  .put('/:id', addPostValidation, asyncWrapper(putPostController))
  .delete('/:id', asyncWrapper(deletePostController));

module.exports = { postsRouter: router };
