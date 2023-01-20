const express = require('express');
const morgan = require('morgan');
const app = express();

const { router } = require('./booksRouter');

const PORT = 8088;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(morgan('dev'));
app.use('/api', router);

app.post('/home', (req, res) => {
  if (!req.body.goit) {
    return res.status(400).json({ status: 'goit parameter is required' });
  }
  res.send({ javascript: 'object - QWERTY', body: req.body });
});

function Server(error) {
  if (error) {
    console.log('Error at server lunch', error);
  }
  console.log(`Server starts at Port: ${PORT}`);
}

app.listen(PORT, Server);
