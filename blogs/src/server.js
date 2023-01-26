const app = require('./app');

const PORT = process.env.PORT || 8081;

const { connectMongoDB } = require('./db/connection');

async function main() {
  try {
    await connectMongoDB();

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });

    return 'done.';
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

main();
// .then(console.log)
// .catch(console.error)
// .finally(() => client.close());
