const { MongoClient } = require('mongodb');
// const collection = require('./collection');

// Connection URL
const url = process.env.DB_HOST;
const client = new MongoClient(url);

// Database Name
const dbName = 'blogs';

const connectMongoDB = async () => {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Database connection successful');
  const db = client.db(dbName);
  //   collection.Posts = db.collection('posts');
  const collection = db.collection('posts');
  return collection;
};

module.exports = {
  connectMongoDB,
};
