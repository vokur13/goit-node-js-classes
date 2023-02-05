const { Post } = require('../model/postsModel');
const UserModel = require('../model/userModel');

const getPosts = async (owner, { skip, limit }) => {
  return await Post.find({ owner })
    .select({ _id: 0, owner: 0, __v: 0 })
    .skip(skip)
    .limit(limit)
    .sort('createdAt');
  // return await UserModel.aggregate([
  //   {
  //     $project: {
  //       __v: 0,
  //       password: 0,
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: 'posts',
  //       localField: '_id',
  //       foreignField: 'owner',
  //       as: 'userPosts',
  //     },
  //   },
  // ]);
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
