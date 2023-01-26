const app = require('./app');
const { MongoClient } = require('mongodb');

const PORT = process.env.PORT || 8081;

// Connection URL
const url = process.env.DB_HOST;
const client = new MongoClient(url);

// Database Name
const dbName = 'blogs';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Database connection successful');
  const db = client.db(dbName);
  const collection = db.collection('posts');

  const findResult = await collection.find({}).toArray();
  console.log('Found documents =>', findResult);

  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
