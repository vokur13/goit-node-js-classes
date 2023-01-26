const app = require('./app');

const PORT = process.env.PORT || 8081;

const { connectMongoDB } = require('./db/connection');

async function main() {
  await connectMongoDB();

  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });

  return 'done.';
}

main();
// .then(console.log)
// .catch(console.error)
// .finally(() => client.close());
