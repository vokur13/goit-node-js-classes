// getting-started.js
const mongoose = require('mongoose');
// mongoose.set('strictQuery', false);
mongoose.set('useCreateIndex', true);

// Connection URL
const url = process.env.DB_HOST;

async function main() {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = {
  main,
};
