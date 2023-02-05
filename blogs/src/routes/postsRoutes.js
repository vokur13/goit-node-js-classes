/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
/* eslint-disable new-cap */
const express = require('express');
const router = new express.Router();
// const { authMiddleware } = require('../middlewares/authMiddleware');
const auth = require('../middleware/authMiddleware');

const {
  getPostsController,
  getPostByIDController,
  addPostController,
  putPostController,
  deletePostController,
} = require('../controller/postsController');

const { addPostValidation } = require('../middleware/validationMiddleware');
const { asyncWrapper } = require('../helpers/apiHelper');

router.use(auth);

router
  .get('/', asyncWrapper(getPostsController))
  .get('/:id', asyncWrapper(getPostByIDController))
  .post('/', addPostValidation, asyncWrapper(addPostController))
  .put('/:id', addPostValidation, asyncWrapper(putPostController))
  .delete('/:id', asyncWrapper(deletePostController));

module.exports = { postsRoutes: router };
