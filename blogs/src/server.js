const app = require('./app');
const { main } = require('./db/connection');

const PORT = process.env.PORT || 8081;

// services
// customErrors

async function start() {
  try {
    await main().catch((err) => console.log(err));
    // await connectMongoDB();

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });

    return 'done.';
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

start();
// .then(console.log)
// .catch(console.error)
// .finally(() => client.close());
