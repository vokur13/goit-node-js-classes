const ObjectId = require('mongodb').ObjectId;

/* eslint-disable space-before-function-paren */
/* eslint-disable object-curly-spacing */

const getPosts = async function (req, res, next) {
  const response = await req.db.collection.find({}).toArray();
  // console.log('Found documents =>', response);
  res.json({
    status: 'success',
    code: 200,
    data: {
      response,
    },
  });
};

const getPostByID = async function (req, res, next) {
  const { id } = req.params;
  // const [post] = posts.filter((item) => item.id === id);
  const response = await req.db.collection.findOne({ _id: new ObjectId(id) });
  if (!response) {
    return res.status(404).json({
      code: 404,
      message: `Document id: ${id} not found`,
    });
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    data: { response },
  });
};

const addPost = async (req, res) => {
  const { title, content } = req.body;
  // posts.push({
  //   id: new Date().getTime().toString(),
  //   title,
  //   content,
  // });
  const response = await req.db.collection.insertOne({ title, content });
  res.status(201).json({
    status: 'success',
    code: 201,
    data: { response },
  });
};

const putPost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  // const [post] = posts.filter((item) => item.id === id);
  // post.title = title;
  // post.content = content;
  const response = await req.db.collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { title, content } }
  );
  res.json({
    status: 'success',
    code: 200,
    data: { response },
  });
};

// const patchPost = (req, res) => {
//   const { id } = req.params;
//   const { title, content } = req.body;
//   const [post] = posts.filter((item) => item.id === id);
//   if (title) {
//     post.title = title;
//   }
//   if (content) {
//     post.content = content;
//   }
//   res.json({
//     status: 'success',
//     code: 200,
//     data: { post },
//   });
// };

const deletePost = async (req, res) => {
  const { id } = req.params;
  // const newPosts = posts.filter((item) => item.id !== id);
  // posts = [...newPosts];
  await req.db.collection.deleteOne({ _id: new ObjectId(id) });
  return res.status(200).json({
    status: 'success',
    code: 200,
    message: 'document deleted',
  });
};

module.exports = {
  getPosts,
  getPostByID,
  addPost,
  putPost,
  // patchPost,
  deletePost,
};
